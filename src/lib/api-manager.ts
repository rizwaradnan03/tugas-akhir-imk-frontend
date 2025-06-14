import axios from "axios";

export const ApiManager = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    responseType: 'json',
    // withCredentials: true
})

ApiManager.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token")

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const ApiManagerWithoutToken = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    responseType: 'json',
})