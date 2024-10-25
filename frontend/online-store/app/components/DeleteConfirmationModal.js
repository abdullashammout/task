import { deleteProduct } from "../services/products";

export default function DeleteConfirmationModal({
  productToDelete,
  onClose,
  onDelete,
}) {
  const confirmDelete = async () => {
    if (productToDelete) {
      await deleteProduct(productToDelete); // Call delete function with product ID
      onDelete(); // Refresh product list after deletion
      onClose(); // Close the modal
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl text-black font-semibold mb-4">
          Confirm Deletion
        </h3>
        <p className="mb-4 text-black">
          Are you sure you want to delete this product?
        </p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
