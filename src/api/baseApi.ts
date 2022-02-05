import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`,
    responseType: "json",
});

export const baseApi = {
    ...axiosInstance,
};