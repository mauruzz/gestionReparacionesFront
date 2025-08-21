import React from "react";
import {Card, CardContent, Typography, Divider, Grid, Chip, CardHeader} from "@mui/material";

const Row = ({ label, value }) => (
    <Grid container spacing={1} sx={{ mb: 0.5 }}>
        <Grid item xs={5}>
            <Typography variant="body2" color="text.secondary">
                {label}
            </Typography>
        </Grid>
        <Grid item xs={7}>
            <Typography variant="body2">{value || "—"}</Typography>
        </Grid>
    </Grid>
);

const ServiceTicketStub = ({ formData }) => {
    const id = formData.id_service_ticket || "—";

    return (
        <Card sx={{ borderRadius: 2, boxShadow: 1, maxWidth: 600 }}>
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    Talón de Seguimiento
                </Typography>

                {/* Primera fila */}
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Row label="N° Ticket" value={id} />
                    </Grid>
                    <Grid item xs={6}>
                        <Row label="Fecha de entrada" value={formData.entry_date} />
                    </Grid>
                </Grid>

                <Divider sx={{ my: 1.5 }} />

                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                    Cliente
                </Typography>

                {/* Cliente */}
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Row label="Nombre" value={formData.client?.name} />
                    </Grid>
                    <Grid item xs={6}>
                        <Row label="Mail" value={formData.client?.email} />
                    </Grid>
                    <Grid item xs={6}>
                        <Row label="Teléfono" value={formData.client?.phone} />
                    </Grid>
                </Grid>

                <Divider sx={{ my: 1.5 }} />

                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                    Instrumento
                </Typography>

                {/* Instrumento */}
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Row label="Producto" value={formData.instrument?.product} />
                    </Grid>
                    <Grid item xs={6}>
                        <Row label="Marca" value={formData.instrument?.brand} />
                    </Grid>
                    <Grid item xs={6}>
                        <Row label="Modelo" value={formData.instrument?.model} />
                    </Grid>
                    <Grid item xs={6}>
                        <Row label="N° de serie" value={formData.instrument?.serial_number} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>

    );
};

export default ServiceTicketStub;
