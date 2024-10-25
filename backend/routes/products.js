const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const prisma = new PrismaClient();

// Create a new product
router.post(
  "/",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Product name is required.")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("Product name should only contain letters."),
    body("price")
      .notEmpty()
      .withMessage("Product price is required.")
      .isNumeric()
      .withMessage("Price should contain only numbers.")
      .isFloat({ gt: 0, max: 1000000 })
      .withMessage("Price must be between 0 and 1,000,000."),
    body("category")
      .trim()
      .notEmpty()
      .withMessage("Category is required.")
      .isAlphanumeric("en-US", { ignore: " " })
      .withMessage("Category should contain only letters and numbers."),
    body("description")
      .optional()
      .trim()
      .isAlphanumeric("en-US", { ignore: " " })
      .withMessage("Description should only contain letters and numbers."),
    body("available")
      .optional()
      .isBoolean()
      .withMessage("Available must be a boolean."),
  ],
  async (req, res) => {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Proceed with creating the product if validation passes
    const { name, price, category, description, available } = req.body;
    try {
      const product = await prisma.product.create({
        data: {
          name,
          price: parseFloat(price),
          category,
          description,
          available,
        },
      });
      res.status(201).json(product);
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Update a product
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, description, available } = req.body;
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, price, category, description, available },
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
