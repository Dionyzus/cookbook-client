import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `http://0.0.0.0:8080`,
    responseType: "json",
});

export const baseApi = {
    ...axiosInstance,
};