"use client";
import { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import { fetchProducts } from "../services/products";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // New state for delete modal
  const [productToDelete, setProductToDelete] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Filter states
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState(true);

  const getProducts = async () => {
    const res = await fetchProducts();
    setProducts(res);
    setFilteredProducts(res);
  };
  const handleDelete = (id) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleApplyFilters = () => {
    let filtered = products;

    // Filter by price range
    if (minPrice !== "" && maxPrice !== "") {
      filtered = filtered.filter(
        (product) =>
          product.price >= parseFloat(minPrice) &&
          product.price <= parseFloat(maxPrice)
      );
    }

    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter((product) =>
        product.category.toLowerCase().includes(categoryFilter.toLowerCase())
      );
    }

    // Filter by availability
    if (availabilityFilter !== null) {
      filtered = filtered.filter(
        (product) => product.available === availabilityFilter
      );
    }

    setFilteredProducts(filtered);
  };
  const handleResetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setCategoryFilter("");
    setAvailabilityFilter(true);
    setFilteredProducts(products); // Reset the filtered products to show all
  };

  useEffect(() => {
    getProducts();
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
        Product shop
      </h1>
      {/* Filter section */}
      <div className="mb-6 p-4 border border-gray-400 rounded">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Filter Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="number"
            min={0}
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="text-black border border-gray-300 rounded p-2"
          />
          <input
            type="number"
            min={0}
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="text-black border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            placeholder="Category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-black border border-gray-300 rounded p-2"
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.checked)}
              className="text-black mr-2"
            />
            <p className="text-black">Available</p>
          </label>
        </div>
        <button
          onClick={handleApplyFilters}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Apply Filters
        </button>
        <button
          onClick={handleResetFilters}
          className="mt-4 bg-gray-500 text-white px-4 ml-5 py-2 rounded hover:bg-gray-600 transition"
        >
          reset Filters
        </button>
      </div>
      <button
        onClick={() => setIsPopupOpen(true)}
        className="button-add text-white px-4 py-2 mb-6 rounded shadow hover:button-add"
      >
        Add Product
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <div className="p-4 bg-white">
              <h2 className="text-xl font-bold text-gray-800 ">
                {product.name.toUpperCase()}
              </h2>
              <p className="item-props">Category: {product.category}</p>
              <p className="item-props">Description: {product.description}</p>
              <p className="item-props">
                Available: {product.available ? "yes" : "no"}
              </p>
            </div>
            <div className="bg-Light-Blue p-4 flex justify-between items-center">
              <p className="item-props text-green-900">
                Price: ${product.price.toFixed(2)}
              </p>
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
          refreshProducts={getProducts}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmationModal
          productToDelete={productToDelete} // Pass the product ID to delete
          onClose={handleCloseDeleteModal}
          onDelete={getProducts} // Pass the refresh function
        />
      )}
    </div>
  );
}
