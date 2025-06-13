const BASE_URL = "https://be-kuliner-indo-production.up.railway.app/api";

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Terjadi kesalahan pada server");
  }
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  }
  return null;
};

export const getAllFoods = async () => {
  const response = await fetch(`${BASE_URL}/foods`);
  return handleResponse(response);
};

export const getFoodById = async (id) => {
  const response = await fetch(`${BASE_URL}/foods/${id}`);
  return handleResponse(response);
};

export const createFood = async (foodData) => {
  const response = await fetch(`${BASE_URL}/foods`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(foodData),
  });
  return handleResponse(response);
};

export const updateFood = async (id, foodData) => {
  const response = await fetch(`${BASE_URL}/foods/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(foodData),
  });
  return handleResponse(response);
};

export const deleteFood = async (id) => {
  const response = await fetch(`${BASE_URL}/foods/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};
