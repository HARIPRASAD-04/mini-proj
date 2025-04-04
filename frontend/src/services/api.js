// src/services/api.js
import axios from "axios";

// Axios instance
const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// =====================
// AUTH APIs
// =====================

export const sendOtp = async (email) => {
  return API.post("/auth/login", { email });
};

export const verifyOtp = async (email, otp) => {
  return API.post("/auth/verify-otp", { email, otp });
};

// =====================
// STUDENT REQUEST APIs
// =====================

// Submit a new request (with optional file upload)
export const submitRequest = async (formData) => {
  return API.post("/request/submit", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// =====================
// REPORT APIs
// =====================

// Fetch requests based on filters (JSON results)
export const fetchFilteredRequests = async ({ reg_no, type_of_work, period }) => {
  const params = {};
  if (reg_no) params.reg_no = reg_no;
  if (type_of_work) params.type_of_work = type_of_work;
  if (period) params.period = period;

  return API.get("/report/fetch", { params });
};

// Download CSV report based on filters
export const downloadCSVReport = async ({ reg_no, type_of_work, period }) => {
  const params = {};
  if (reg_no) params.reg_no = reg_no;
  if (type_of_work) params.type_of_work = type_of_work;
  if (period) params.period = period;

  return API.get("/report/download-csv", {
    params,
    responseType: "blob", // Needed for file download
  });
};

export default API;
