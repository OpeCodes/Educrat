import axios from "axios";

export const customFetch = axios.create({
    baseURL: "https://educrat-be.onrender.com/api/v1"
})
