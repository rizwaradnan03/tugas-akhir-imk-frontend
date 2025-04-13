import axios from "axios";

export const ApiManager = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    responseType: 'json',
    // withCredentials: true
})