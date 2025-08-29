import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    IconButton,
    TextField,
    Button,
    Grid,
    Checkbox,
    Card, CardContent,
    Stack, Paper, Typography, Divider,
    Select, MenuItem, Chip, InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import './TableStyle.css';

const StatusTab = () => {
    const [statuses, setStatuses] = useState([]);
    const [formData, setFormData] = useState({
        id_status: null,
        description: "",
        color: "",
        enable: true,
    });
    const [loading, setLoading] = useState(false);
    const statusColors = {
        NARANJA: "warning",
        AZUL: "info",
        VERDE: "success",
        ROJO: "error",
        VIOLETA: "secondary",
    };


    useEffect(() => {

        const fetchAll = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const res = await axios.get('http://localhost:9000/api/status/all', config);
                setStatuses(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error('Error al cargar tickets', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    const handleEdit = (status) => {
        setFormData({
            id_status: status.id_status,
            description: status.description,
            color: status.color,
            enable: status.enable,
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const authHeaders = () => {
        const token = localStorage.getItem("token");
        return {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // evita que el form recargue la página
        setLoading(true);
        try {
            let response;
            if (formData.id_status) {
                // 🔄 Actualizar
                response = await fetch(`http://localhost:9000/api/status/${formData.id_status}`, {
                    method: "PUT",
                    headers: authHeaders(),
                    body: JSON.stringify(formData),
                });
            } else {
                // ➕ Crear
                response = await fetch("http://localhost:9000/api/status/save", {
                    method: "POST",
                    headers: authHeaders(),
                    body: JSON.stringify(formData),
                });
            }

            if (!response.ok) {
                throw new Error("Error en la petición");
            }

            const data = await response.json();
            console.log("Guardado/Actualizado con éxito:", data);

            // ✅ opcional: limpiar formulario
            setFormData({
                id_status: "",
                description: "",
                color: "",
                enable: false,
            });
            // ✅ opcional: refrescar lista o redirigir
            // navigate("/status"); // si usás react-router
            // window.location.reload(); // recarga la página (no es lo más elegante)
            window.location.reload() //MEJORAR
        } catch (error) {
            console.error("Error al guardar:", error);
        } finally {
            setLoading(false);
        }
    };


    if (loading) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ flexGrow: 1, width: "100%" }}>
            <Stack direction="row" spacing={3} alignItems="flex-start">
                {/* Tabla */}
                <TableContainer
                    sx={{ flex: 1 , borderRadius:2}}
                    component={Paper}
                    className="component-table-container"
                >
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Color</TableCell>
                                <TableCell>Habilitado</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {statuses.map((status) => (
                                <TableRow key={status.id_status}>
                                    <TableCell>{status.description}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={status.color}
                                            color={statusColors[status.color] || "default"}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox checked={status.enable} disabled />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEdit(status)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Formulario */}
                <Card
                    sx={{
                        borderRadius: 2,
                        boxShadow: 3,
                        width: 350, // tamaño fijo más prolijo
                        flexShrink: 0, // evita que se achique
                    }}
                >
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                            Registro de Estado
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Box component="form" onSubmit={handleSubmit}>
                            <Stack spacing={2}>
                                <TextField
                                    label="Descripción"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    size="small"
                                />
                                <TextField
                                    select
                                    label="Color"
                                    name="color"
                                    value={formData.color}
                                    onChange={handleChange}
                                >
                                    {Object.entries(statusColors).map(([status, color]) => (
                                        <MenuItem key={status} value={status}>
                                            <Chip label={status} color={color} size="small" />
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <Stack direction="row" alignItems="center">
                                    <Checkbox
                                        name="enable"
                                        checked={formData.enable || false}
                                        onChange={handleChange}
                                    />
                                    Habilitado
                                </Stack>
                                <Button type="submit" variant="contained">
                                    {formData.id_status ? "Actualizar" : "Crear"}
                                </Button>
                            </Stack>
                        </Box>
                    </CardContent>
                </Card>
            </Stack>
        </Box>
    );

};

export default StatusTab;
