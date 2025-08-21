import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Card,
    CardContent,
    Divider,
    MenuItem,
} from "@mui/material";

const UserForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        type: "",
        name: "",
        email: "",
        branch: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    return (
        <Card sx={{ borderRadius: 2, boxShadow: 3, maxWidth: 700, mx: "auto" }}>
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Registro de Usuario
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                    <TextField
                        label="Usuario"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        label="Contraseña"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        select
                        label="Tipo de usuario"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="INVITADO">INVITADO</MenuItem>
                        <MenuItem value="TECNICO">TECNICO</MenuItem>
                        <MenuItem value="RECEPCION">RECEPCION</MenuItem>
                        <MenuItem value="ADMIN">ADMIN</MenuItem>
                    </TextField>

                    <TextField
                        label="Nombre completo"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        label="Correo electrónico"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        label="Sucursal"
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        required
                    />

                    <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                        Registrar Usuario
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default UserForm;
