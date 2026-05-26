import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api', // Adjust if your backend runs on a different port
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors for Request
axiosClient.interceptors.request.use(
  (config) => {
    // Automatically attach token to headers if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptors for Response
axiosClient.interceptors.response.use(
  (response) => {
    // Directly return the data payload to simplify handling in components
    if (response && response.data) {
      const resData = response.data;
      // If the backend wraps the payload inside a ResponseWrapper (has status, code, and data)
      if (resData && typeof resData === 'object' && 'status' in resData && 'code' in resData && 'data' in resData) {
        return resData.data;
      }
      return resData;
    }
    return response;
  },
  (error) => {
    // Handle errors globally here (e.g., showing notifications or redirecting to login on 401)
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosClient;
