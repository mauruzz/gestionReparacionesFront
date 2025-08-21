import React, {useState} from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import UserForm from "../components/UserForm";
import './UserRegister.css';

const UserRegister = () => {
    const [collapsed, setCollapsed] = useState(false);

    const authHeaders = () => {
        const token = localStorage.getItem("token");
        return {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };
    };

    const handleUserSubmit = async (formData) => {
        try {
            const response = await fetch("http://localhost:9000/auth/register", {
                method: "POST",
                headers: authHeaders(),
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Error al registrar usuario");
            }

            alert("Usuario registrado correctamente ✅");
            window.location.reload();
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            <Box component="main" sx={{ flexGrow: 1, p: 3 }} className={`user-register-content ${collapsed ? "collapsed" : ""}`}>
                <UserForm onSubmit={handleUserSubmit} />
            </Box>
        </Box>
    );
};

export default UserRegister;
