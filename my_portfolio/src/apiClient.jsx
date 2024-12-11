import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  async (config) => {
    config.headers = {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    return config;
  },
  (Response) => {
    return Response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
