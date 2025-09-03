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
                            label="Nombre de cliente"
                            value={""}
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
                            label="Producto"
                            value={""}
                        />
                    </Grid>
                </Grid>
                <Stack direction="row" spacing={1} justifyContent="flex-start" flexWrap="wrap" sx={{marginTop: 2}}>
                    <Button type="submit" variant="contained" onClick={handleSubmit}>
                        Filtrar
                    </Button>
                    <Button variant="outlined" onClick={onExport} sx={{marginLeft: 2}}>
                        Exportar Excel
                    </Button>
                </Stack>
            </CardContent>
        </Card>

    );
}

export default FiltersForm;
