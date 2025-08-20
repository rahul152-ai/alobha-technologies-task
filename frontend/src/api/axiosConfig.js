import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
});

const axiosInstanceWithInterceptor = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
});

// Request Interceptor
axiosInstanceWithInterceptor.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstanceWithInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("error intercepted", error);
    const errorObj = {};
    if (error.response && error.response.data) {
      errorObj["status"] = error.response.status;
      errorObj["message"] = error.response.data.message;
    } else {
      errorObj["message"] = error.message;
    }
    if (error?.response?.status === 401) {
      window.localStorage.clear();
      window.location.href = "/login";
    }
    if (
      error?.response?.status === 403 &&
      errorObj.message === "Access denied. Insufficient permissions."
    ) {
      window.location.href = "/unauthorized";
    }
    return Promise.reject(errorObj);
  }
);

export { axiosInstanceWithInterceptor, axiosInstance };
