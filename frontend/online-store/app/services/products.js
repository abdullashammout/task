const API_URL = "http://localhost:4000"; // Adjust to your backend URL

export async function fetchProducts() {
  try {
    const response = await fetch(`${API_URL}`);
    return response.json();
  } catch (error) {}
}

export async function addProduct(product) {
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
    console.log(error);
  }
}
export async function updateProduct(id, product) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  return response.json();
}
