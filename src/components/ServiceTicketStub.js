import React from "react";
import { Card, CardContent, Typography, Divider, Grid } from "@mui/material";

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
                <Divider sx={{ mb: 2 }} />

                <Row label="N° Ticket" value={id} />
                <Row label="Fecha de entrada" value={formData.entry_date} />

                <Divider sx={{ my: 1.5 }} />

                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                    Cliente
                </Typography>
                <Row label="Nombre" value={formData.client?.name} />
                <Row label="Mail" value={formData.client?.email} />
                <Row label="Teléfono" value={formData.client?.phone} />

                <Divider sx={{ my: 1.5 }} />

                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                    Instrumento
                </Typography>
                <Row label="Producto" value={formData.instrument?.product} />
                <Row label="Marca" value={formData.instrument?.brand} />
                <Row label="Modelo" value={formData.instrument?.model} />
                <Row label="N° de serie" value={formData.instrument?.serial_number} />

                <Divider sx={{ my: 1.5 }} />

                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                    Detalle
                </Typography>
                <Row label="Defecto" value={formData.defect} />
            </CardContent>
        </Card>
    );
};

export default ServiceTicketStub;
