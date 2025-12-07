// api.js (place in src/utils or src/api)

const BASE_URL = "https://6ec9d17e8813.ngrok-free.app/api"; // change as needed

const request = async (endpoint, method = "GET", data = null, token = null, isFormData = false) => {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {"ngrok-skip-browser-warning": "true"};

  if (!isFormData) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const options = {
    method,
    headers,
    ...(data && { body: isFormData ? data : JSON.stringify(data) }),
  };

  try {
    const response = await fetch(url, options);
    const contentType = response.headers.get("content-type");
    const result = contentType?.includes("application/json") ? await response.json() : {};

    if (!response.ok) {
      const error = new Error(result.detail || "Something went wrong");
      error.response = { status: response.status, data: result };
      throw error;
    }

    return result;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default request;
