import axios from "axios";
import AuthService from "./IteraDiscService/IteraDiscServiceAuth";

export const HTTPClient = axios.create({baseURL: "http://localhost:5279", headers: {
    'Access-Control-Allow-Origins' :'*',
    'Access-Control-Allow-Headers': 'Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Content-Type': 'application/json;charset=UTF-8',
}})

// Interceptor: adiciona o token em toda requisição
HTTPClient.interceptors.request.use((config) => {
  const token = AuthService.obterToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor: se o token expirar (401), redireciona pro login
HTTPClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      AuthService.encerrarSessao();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);