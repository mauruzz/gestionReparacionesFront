import React from "react";
import * as XLSX from "xlsx";
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

function FilteredTicketsTable({ tickets }) {

    return (
        <Box sx={{ flexGrow: 1, width: "100%", paddingTop: 3 }}>
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
                                <TableCell>Id</TableCell>
                                <TableCell>F. ingreso</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Telefono</TableCell>
                                <TableCell>Dirección</TableCell>
                                <TableCell>Producto</TableCell>
                                <TableCell>Modelo</TableCell>
                                <TableCell>N° de serie</TableCell>
                                <TableCell>Garantía</TableCell>
                                <TableCell>Observaciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tickets.length > 0 ? (
                                tickets.map((t) => (
                                <TableRow key={t.id_service_ticket}>
                                    <TableCell>{t.id_service_ticket}</TableCell>
                                    <TableCell>{t.entry_date}</TableCell>
                                    <TableCell>{t.client.name}</TableCell>
                                    <TableCell>{t.client.email}</TableCell>
                                    <TableCell>{t.client.phone}</TableCell>
                                    <TableCell>{t.client.address}</TableCell>
                                    <TableCell>{t.instrument.product}</TableCell>
                                    <TableCell>{t.instrument.model}</TableCell>
                                    <TableCell>{t.instrument.serial_number}</TableCell>
                                    <TableCell>{t.instrument.warranty}</TableCell>
                                    <TableCell>{t.instrument.comments}</TableCell>
                                </TableRow>
                            ))
                            ) : (
                                <TableRow>
                                    <TableCell>No hay resultados</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Box>
    );
}

export default FilteredTicketsTable;
