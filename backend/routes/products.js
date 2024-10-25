const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();

// Create a new product
router.post("/", async (req, res) => {
  try {
    const { name, price, category, description, available } = req.body;
    const product = await prisma.product.create({
      data: { name, price, category, description, available },
    });
    res.status(201).json(product);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

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
