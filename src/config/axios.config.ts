import axios from "axios"
export const axiosinstance = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}`,
    timeout: 1000,
});
export const axiosValidation = axios.create({
    baseURL: `http://localhost:1337`,
    timeout: 1000,
});
