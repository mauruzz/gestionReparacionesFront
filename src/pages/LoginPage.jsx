// src/pages/LoginPage.jsx
import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Card,
    CardContent,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:9000/auth/login", {
                username,
                password
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.username);
            localStorage.setItem("role", res.data.role);

            navigate("/dashboard");
        } catch (err) {
            alert("Usuario o contraseña incorrectos");
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.default",
                px: 2,
            }}
        >
            <Card
                sx={{
                    width: "100%",
                    maxWidth: 400,
                    boxShadow: "0 4px 20px 0 rgba(0,0,0,0.14)",
                    borderRadius: 2,
                }}
            >
                <CardContent sx={{ p: 4 }}>
                    <Typography
                        variant="h4"
                        align="center"
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                            color: "text.primary",
                        }}
                    >
                        Iniciar sesión
                    </Typography>

                    <form onSubmit={handleLogin}>
                        <TextField
                            label="Usuario"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            label="Contraseña"
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Typography
                            variant="body2"
                            sx={{
                                mt: 1,
                                mb: 2,
                                color: "primary.main",
                                cursor: "pointer",
                                textAlign: "right",
                            }}
                            onClick={() => alert("Función no implementada aún")}
                        >
                            ¿Olvidó su contraseña?
                        </Typography>

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: "primary.main",
                                fontWeight: "bold",
                                textTransform: "none",
                                py: 1.2,
                                fontSize: "1rem",
                                "&:hover": {
                                    backgroundColor: "primary.dark",
                                },
                            }}
                        >
                            Entrar
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}
