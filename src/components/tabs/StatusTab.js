import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import './TableStyle.css';

const StatusTab = () => {
    const [statuses, setStatuses] = useState([]);
    const [formData, setFormData] = useState({
        descripcion: "",
        color: "",
        habilitado: true,
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const fetchAll = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const res = await axios.get('http://localhost:9000/api/service_ticket/all', config);
                setTickets(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error('Error al cargar tickets', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();


        // acá harías el fetch a tu API
        setStatuses([
            { id: 1, descripcion: "Pendiente", color: "#f44336", habilitado: true },
            { id: 2, descripcion: "En proceso", color: "#2196f3", habilitado: true },
            { id: 3, descripcion: "Pendiente", color: "#f44336", habilitado: true },
            { id: 4, descripcion: "En proceso", color: "#2196f3", habilitado: true },
            { id: 5, descripcion: "Pendiente", color: "#f44336", habilitado: true },
            { id: 6, descripcion: "En proceso", color: "#2196f3", habilitado: true },
        ]);
    }, []);

    const handleEdit = (status) => {
        setEditingId(status.id);
        setFormData({
            descripcion: status.descripcion,
            color: status.color,
            habilitado: status.habilitado,
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingId) {
            // update
            setStatuses((prev) =>
                prev.map((s) =>
                    s.id === editingId ? { ...s, ...formData } : s
                )
            );
        } else {
            // create
            setStatuses((prev) => [
                ...prev,
                { id: prev.length + 1, ...formData },
            ]);
        }

        setFormData({ descripcion: "", color: "", habilitado: true });
        setEditingId(null);
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
                                <TableRow key={status.id}>
                                    <TableCell>{status.descripcion}</TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                width: 20,
                                                height: 20,
                                                bgcolor: status.color,
                                                border: "1px solid #ccc",
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox checked={status.habilitado} disabled />
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
                                    name="descripcion"
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                    size="small"
                                />
                                <TextField
                                    label="Color"
                                    name="color"
                                    value={formData.color}
                                    onChange={handleChange}
                                    size="small"
                                />
                                <Stack direction="row" alignItems="center">
                                    <Checkbox
                                        name="habilitado"
                                        checked={formData.habilitado}
                                        onChange={handleChange}
                                    />
                                    Habilitado
                                </Stack>
                                <Button type="submit" variant="contained">
                                    {editingId ? "Actualizar" : "Crear"}
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
