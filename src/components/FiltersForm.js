import React, { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent, CardHeader,
    Checkbox,
    Chip,
    Divider, FormControl, Grid, InputLabel,
    MenuItem, Select,
    Stack,
    TextField, Typography
} from "@mui/material";


function FiltersForm({ onSubmit, onExport }) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [clientName, setClientName] = useState("");
    const [model, setModel] = useState("");
    const [product, setProduct] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ startDate, endDate, clientName, model, product });
    };

    return (
        <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardHeader
                title="Filtros"
                slotProps={{ title: { fontSize: "xx-large" } }}
                sx={{
                    pb: 0,
                    "& .MuiCardHeader-title ": { fontWeight: 700 },
                }}
            />
            <CardContent>

                <Grid container spacing={2} sx={{ mb: 1 }}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            size="small"
                            type="date"
                            label="Fecha desde"
                            slotProps={{ inputLabel: { shrink: true } }}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            size="small"
                            type="date"
                            label="Fecha hasta"
                            slotProps={{ inputLabel: { shrink: true } }}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Modelo"
                            value={""}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            size="small"
                            label="N° de serie"
                            value={""}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            size="small"
                            type="date"
                            label="Fecha de compra"
                            slotProps={{ inputLabel: { shrink: true } }}
                            value={""}
                        />
                    </Grid>


                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            size="small"
                            multiline
                            minRows={2}
                            label="Observaciones"
                            value={""}
                        />
                    </Grid>
                </Grid>
                <Grid>
                    <Button type="submit" variant="contained" onClick={handleSubmit}>
                        Filtrar
                    </Button>
                    <Button variant="outlined" onClick={onExport}>
                        Exportar Excel
                    </Button>
                </Grid>
            </CardContent>
        </Card>

    );
}

export default FiltersForm;
