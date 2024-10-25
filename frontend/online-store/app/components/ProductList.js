"use client";
import { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import { deleteProduct, fetchProducts } from "../services/products";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:4000");
    const data = await res.json();
    setProducts(data);
  };
  const handleDelete = async (id) => {
    await deleteProduct(id); // Call the delete function with the product ID
    fetchProducts(); // Refresh the product list after deletion
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Product List
      </h1>
      <button
        onClick={() => setIsPopupOpen(true)}
        className="button-add text-white px-4 py-2 mb-6 rounded shadow hover:button-add"
      >
        Add Product
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <div className="p-4 bg-white">
              <h2 className="text-xl font-bold text-gray-800 ">
                {product.name}
              </h2>
              <p className="item-props">Category: {product.category}</p>
              <p className="item-props">Description: {product.description}</p>
              <p className="item-props">
                Available: {product.available ? "yes" : "no"}
              </p>
            </div>
            <div className="bg-Light-Blue p-4 flex justify-between items-center">
              <p className="item-props ">Price: ${product.price.toFixed(2)}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="button-edit  text-white px-4 py-2 rounded button-edit:hover"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)} // Call the delete function
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isPopupOpen && (
        <ProductForm
          isEditing={!!selectedProduct}
          productData={selectedProduct}
          onClose={handleClosePopup}
          refreshProducts={fetchProducts}
        />
      )}
    </div>
  );
}
