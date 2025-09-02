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
                                <TableCell>Fecha de ingreso</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Telefono</TableCell>
                                <TableCell>Dirección</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tickets.length > 0 ? (
                                tickets.map((t) => (
                                <TableRow key={t.id_service_ticket}>
                                    <TableCell>{t.entry_date}</TableCell>
                                    <TableCell>{t.client.name}</TableCell>
                                    <TableCell>{t.client.phone}</TableCell>
                                    <TableCell>{t.client.address}</TableCell>
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
