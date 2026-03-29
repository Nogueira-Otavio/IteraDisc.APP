import { Navigate } from "react-router-dom";
import AuthService from "../../services/IteraDiscService/IteraDiscServiceAuth";

export function RotaProtegida({ children }) {
  if (!AuthService.estaLogado()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}