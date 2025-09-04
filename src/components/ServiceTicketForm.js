import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    Grid,
    TextField,
    Typography,
    Box, FormControl, InputLabel, Select, MenuItem,
} from "@mui/material";
import './ServiceTicketForm.css';

const SectionTitle = ({ children }) => (
    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        {children}
    </Typography>
);

const ServiceTicketForm = ({ formData, setFormData }) => {
    const statusColors = {
        NARANJA: "warning",
        AZUL: "info",
        VERDE: "success",
        ROJO: "error",
        VIOLETA: "secondary",
    };

    const setField = (name, value) =>
        setFormData((prev) => ({ ...prev, [name]: value }));

    const setNested = (obj, field, value) =>
        setFormData((prev) => ({ ...prev, [obj]: { ...prev[obj], [field]: value } }));

    const handleInstrumentChange = (e) => {
        const { name, value } = e.target;

        let parsedValue = value;

        // Si el campo es warranty, asegurar booleano
        if (name === "warranty") {
            parsedValue = value === "true" || value === true;
        }

        setFormData(prev => ({
            ...prev,
            instrument: {
                ...prev.instrument,
                [name]: parsedValue
            }
        }));
    };

    return (
        <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardHeader
                title="Nota de inspección"
                slotProps={{ title: { fontSize: "xx-large" } }}
                sx={{
                    pb: 0,
                    "& .MuiCardHeader-title ": { fontWeight: 700 },
                }}
                action={
                    <Chip
                        label={`N° ${formData.id_service_ticket || "—"}`}
                        color="primary"
                        variant="filled"
                        sx={{ fontWeight: 700 }}
                        size="large"
                    />
                }
            />
            <CardContent>
                {/* Fecha de entrada (opcional, arriba) */}
                <Grid container spacing={2} sx={{ mb: 1 }}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            size="small"
                            type="date"
                            label="Fecha de ingreso"
                            slotProps={{ inputLabel: { shrink: true } }}
                            value={formData.entry_date || ""}
                            onChange={(e) => setField("entry_date", e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={40}>
                        <FormControl sx={{ m: 1, width: 203, minWidth: 110, margin: 0 }} size={"small"} variant="outlined">
                            <InputLabel id="status-label">Estado</InputLabel>
                            <Select
                                labelId="status-label"
                                name="status"
                                value={formData.status.desciption}
                                fullWidth={true}
                                label="Estado"
                            >
                                <MenuItem key={formData.status.desciption} value={formData.status.desciption}>
                                    <Chip label={formData.status.desciption} color={formData.status.color} size="small" />
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                </Grid>

                <Divider sx={{ my: 2 }} />

                {/* 1) Cliente */}
                <SectionTitle>Datos del Cliente</SectionTitle>
                <Grid container spacing={2} sx={{ mb: 1 }}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Nombre"
                            value={formData.client?.name || ""}
                            onChange={(e) => setNested("client", "name", e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Teléfono"
                            value={formData.client?.phone || ""}
                            onChange={(e) => setNested("client", "phone", e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            size="small"
                            type="email"
                            label="Mail"
                            value={formData.client?.email || ""}
                            onChange={(e) => setNested("client", "email", e.target.value)}
                        />
                    </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                {/* 2) Instrumento */}
                <SectionTitle>Datos del Instrumento</SectionTitle>
                <Grid container spacing={2} sx={{ mb: 1 }}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Producto"
                            value={formData.instrument?.product || ""}
                            onChange={(e) => setNested("instrument", "product", e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Marca"
                            value={formData.instrument?.brand || ""}
                            onChange={(e) => setNested("instrument", "brand", e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Modelo"
                            value={formData.instrument?.model || ""}
                            onChange={(e) => setNested("instrument", "model", e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            size="small"
                            label="N° de serie"
                            value={formData.instrument?.serial_number || ""}
                            onChange={(e) =>
                                setNested("instrument", "serial_number", e.target.value)
                            }
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            size="small"
                            type="date"
                            label="Fecha de compra"
                            slotProps={{ inputLabel: { shrink: true } }}
                            value={formData.instrument?.purchase_date || ""}
                            onChange={(e) =>
                                setNested("instrument", "purchase_date", e.target.value)
                            }
                        />
                    </Grid>
                    <Grid item xs={12} md={40}>
                        <FormControl sx={{ m: 1, width: 203, minWidth: 110, margin: 0 }} size={"small"} variant="outlined">
                            <InputLabel id="warranty-label">Garantía</InputLabel>
                            <Select
                                labelId="warranty-label"
                                name="warranty"
                                value={formData.instrument?.warranty ? "true" : "false"}
                                onChange={handleInstrumentChange}
                                fullWidth={true}
                                label="Garantía"
                            >
                                <MenuItem value={true}>Sí</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            size="small"
                            multiline
                            minRows={2}
                            label="Observaciones"
                            value={formData.instrument?.notice || ""}
                            onChange={(e) => setNested("instrument", "notice", e.target.value)}
                        />
                    </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                {/* 3) Service Ticket */}
                <SectionTitle>Datos de inspección</SectionTitle>
                <Grid container spacing={2} sx={{ mb: 1 }}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            size="small"
                            multiline
                            minRows={2}
                            label="Defecto"
                            value={formData.defect || ""}
                            onChange={(e) => setField("defect", e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            size="small"
                            multiline
                            minRows={2}
                            label="Presupuesto"
                            value={formData.budget || ""}
                            onChange={(e) => setField("budget", e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <TextField
                            fullWidth
                            size="small"
                            multiline
                            minRows={2}
                            label="Trabajo realizado"
                            value={formData.work_done || ""}
                            onChange={(e) => setField("work_done", e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            size="small"
                            type="number"
                            label="Costo de reparación"
                            value={formData.total_cost || ""}
                            onChange={(e) => setField("total_cost", e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            size="small"
                            multiline
                            minRows={2}
                            label="Observaciones"
                            value={formData.comments || ""}
                            onChange={(e) => setField("comments", e.target.value)}
                        />
                    </Grid>
                </Grid>

                {/* Si querés mostrar quién cargó el ticket */}
                {localStorage.getItem("name") ? (
                    <div className={"no-print"}>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ color: "text.secondary" }}>
                            <Typography variant="caption">
                                Usuario: <strong>{localStorage.getItem("name")}</strong>
                            </Typography>
                        </Box>
                    </div>
                ) : null}
            </CardContent>
        </Card>
    );
};

export default ServiceTicketForm;
