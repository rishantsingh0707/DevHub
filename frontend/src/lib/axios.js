import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api"   // local backend
    : import.meta.env.VITE_API_URL; // deployed backend

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

