import axios from "axios";
import toast from "react-hot-toast";
import dotenv from "dotenv";
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5002/api" : "/api";

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// Handle 401 (session expired / unauthorized) globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            toast.error("Session expired. Please log in again.");
            // Small delay so toast is visible before redirect
            setTimeout(() => {
                window.location.href = "/login";
            }, 1500);
        }
        return Promise.reject(error);
    }
);

export default api;
