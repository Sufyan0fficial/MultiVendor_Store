import axios from "axios";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_API_PROD
    : import.meta.env.VITE_API_DEV;

console.log('base url is',baseUrl)

const axiosInstance = axios.create({
  baseURL: `${baseUrl}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  // timeout: 10000,
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("inerceptor caught error is ", error);
    return Promise.reject(error);
  }
);


export {axiosInstance}