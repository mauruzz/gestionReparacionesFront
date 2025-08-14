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
    Box,
} from "@mui/material";
import './ServiceTicketForm.css';

const SectionTitle = ({ children }) => (
    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        {children}
    </Typography>
);

const ServiceTicketForm = ({ formData, setFormData }) => {
    const setField = (name, value) =>
        setFormData((prev) => ({ ...prev, [name]: value }));

    const setNested = (obj, field, value) =>
        setFormData((prev) => ({ ...prev, [obj]: { ...prev[obj], [field]: value } }));

    return (
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardHeader
                className={"card-header"}
                title="Nota de inspección"
                sx={{
                    pb: 0,
                    "& .MuiCardHeader-title": { fontWeight: 700, fontsize: "30px"},
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
                            InputLabelProps={{ shrink: true }}
                            value={formData.entry_date || ""}
                            onChange={(e) => setField("entry_date", e.target.value)}
                        />
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
                            InputLabelProps={{ shrink: true }}
                            value={formData.instrument?.purchase_date || ""}
                            onChange={(e) =>
                                setNested("instrument", "purchase_date", e.target.value)
                            }
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Garantía"
                            placeholder="Ej: Sí (hasta 01/2026)"
                            value={formData.instrument?.warranty || ""}
                            onChange={(e) => setNested("instrument", "warranty", e.target.value)}
                        />
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
                <SectionTitle>Datos del Service Ticket</SectionTitle>
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
                {formData.user?.username ? (
                    <>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ color: "text.secondary" }}>
                            <Typography variant="caption">
                                Usuario: <strong>{formData.user.username}</strong> ({formData.user.role || "—"})
                            </Typography>
                        </Box>
                    </>
                ) : null}
            </CardContent>
        </Card>
    );
};

export default ServiceTicketForm;
