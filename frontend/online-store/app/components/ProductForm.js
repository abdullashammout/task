import { useState, useEffect } from "react";
import { addProduct, updateProduct } from "../services/products";

export default function ProductForm({
  isEditing,
  productData,
  onClose,
  refreshProducts,
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    if (isEditing && productData) {
      setName(productData.name);
      setPrice(productData.price);
      setCategory(productData.category);
      setDescription(productData.description);
      setAvailable(productData.available);
    }
  }, [isEditing, productData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      name,
      price: parseFloat(price),
      category,
      description,
      available,
    };

    if (isEditing) {
      await updateProduct(productData.id, product);
    } else {
      await addProduct(product);
    }

    refreshProducts();
    onClose();
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
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" text-black border border-gray-300 rounded p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="text-black border border-gray-300 rounded p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="text-black border border-gray-300 rounded p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-black border border-gray-300 rounded p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="text-gray-700 flex items-center mb-4">
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
