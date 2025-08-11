import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const token = localStorage.getItem("token"); // Verifica si hay token

    // Si hay token, muestra el contenido; si no, redirige al login
    return token ? children : <Navigate to="/login" />;
}