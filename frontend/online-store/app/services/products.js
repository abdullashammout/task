const API_URL = "http://localhost:4000"; // Adjust to your backend URL

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}`);
    return response.json();
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

export const addProduct = async (product) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    return response.json();
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};
export const updateProduct = async (id, product) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    return response.json();
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};
// services/products.js
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`http://localhost:4000/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      // Handle the error response
      throw new Error("Failed to delete product");
    }

    // If the response has no content, return null
    if (response.status === 204) {
      return null; // No content response
    }

    // Otherwise, parse and return the response JSON (if applicable)
    return await response.json();
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};
