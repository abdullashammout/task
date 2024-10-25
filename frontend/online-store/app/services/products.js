const API_URL = "http://localhost:4000"; // Adjust to your backend URL

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Propagate the error for the caller to handle
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

    if (!response.ok) {
      const errorData = await response.json();
      // Check if the error response has validation errors
      throw new Error(
        errorData.errors
          ? errorData.errors.map((err) => err.msg).join(", ")
          : "Failed to add product"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding product:", error);
    throw error; // Propagate the error
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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.errors
          ? errorData.errors.map((err) => err.msg).join(", ")
          : "Failed to update product"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating product:", error);
    throw error; // Propagate the error
  }
};

// services/products.js
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
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
    throw error; // Propagate the error
  }
};
