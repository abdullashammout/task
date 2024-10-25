import { useState, useEffect } from "react";
import { addProduct, updateProduct } from "../services/products";

export default function ProductForm({
  isEditing,
  productData,
  onClose,
  refreshProducts,
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [available, setAvailable] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing && productData) {
      setName(productData.name);
      setPrice(productData.price);
      setCategory(productData.category);
      setDescription(productData.description);
      setAvailable(productData.available);
    }
  }, [isEditing, productData]);

  const validateForm = () => {
    const newErrors = {};
    //name validation
    if (!name.trim()) newErrors.name = "Product name is required.";
    else if (!/^[A-Za-z\s]+$/.test(name))
      newErrors.name = "Product name should only contain letters";

    //prive validation
    if (!price || isNaN(price) || price <= 0)
      newErrors.price = "Product price is required";
    else if (!/^[0-9\s]+$/.test(price))
      newErrors.price = "Price should contain only positive numbers";

    //category validation
    if (!category.trim()) newErrors.category = "Category is required.";
    else if (!/^[A-Za-z0-9\s]+$/.test(category))
      newErrors.category = "Category should contain only letters and numbers";

    // description validation
    if (description == "") {
      newErrors.description = null;
    } else if (!/^[A-Za-z0-9\s]+$/.test(description)) {
      newErrors.description =
        "Description should only contain letters and numbers";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!validateForm()) return; // Stop if form is invalid

    const product = {
      name,
      price: parseFloat(price),
      category,
      description,
      available,
    };
    try {
      if (isEditing) {
        await updateProduct(productData.id, product);
      } else {
        await addProduct(product);
      }

      refreshProducts();
      onClose();
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        backend: error.response
          ? error.response.data.message
          : "An error occurred. Please try again.",
      }));
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-70 flex justify-center items-center"
      onClick={onClose} // Close modal on backdrop click
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg w-96"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <h2 className="text-black font-c text-2xl font-bold text-center mb-4">
          {isEditing ? "Edit Product" : "Add Product"}
        </h2>
        {errors.backend && (
          <p className="text-red-500 text-sm mb-4">{errors.backend}</p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            maxLength={30}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" text-black border border-gray-300 rounded p-3 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mb-2">{errors.name}</p>
          )}

          <input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="text-black border border-gray-300 rounded p-3 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mb-4">{errors.price}</p>
          )}

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="text-black border border-gray-300 rounded p-3 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.category && (
            <p className="text-red-500 text-sm mb-4">{errors.category}</p>
          )}

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-black border border-gray-300 rounded p-3 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
          <label className="text-gray-700 flex items-center mb-2">
            <input
              type="checkbox"
              checked={available}
              onChange={() => setAvailable(!available)}
              className="text-black mr-2"
            />
            Available
          </label>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            {isEditing ? "Update" : "Add"} Product
          </button>
        </form>
      </div>
    </div>
  );
}
