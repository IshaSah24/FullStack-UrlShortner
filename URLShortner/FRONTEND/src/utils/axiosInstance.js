import axios from "axios";

let navigate = null; // placeholder

export const injectNavigation = (navigateFn) => {
  navigate = navigateFn;
};

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      console.error("API Error:", {
        status,
        message: data?.message || error.message,
        url: error.config.url,
      });

      switch (status) {
        case 400:
          alert("Bad Request: Please check your input.");
          break;

        case 401:
          if (navigate) {
            navigate("/login");
          } else {
            alert("Unauthorized: Please login again.");
          }

          break;

        case 403:
          alert("Forbidden: You don't have permission.");
          break;

        case 404:
          alert("Not Found: Requested resource doesn't exist.");
          break;

        case 500:
          alert("Server Error: Please try again later.");
          break;

        default:
          alert(data?.message || "An unexpected error occurred.");
      }
    } else if (error.request) {
      alert("No response received from server. Check your connection.");
    } else {
      alert(`Error setting up request: ${error.message}`);
    }
    return Promise.reject(error);
  }
);
