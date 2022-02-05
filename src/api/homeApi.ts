import { baseApi } from "./baseApi";

export async function home() {
    return await baseApi.get("/");
}

export async function about() {
    return await baseApi.get("/about");
}