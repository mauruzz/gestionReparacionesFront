import React from "react";
import { Button, Stack } from "@mui/material";

const ActionButtons = () => {
    return (
        <Stack spacing={1}>
            <Button variant="contained" color="primary">Enviar</Button>
            <Button variant="outlined">Actualizar</Button>
            <Button variant="outlined">Imprimir todo</Button>
            <Button variant="outlined">Imprimir nota</Button>
            <Button variant="outlined">Imprimir talón</Button>
            <Button variant="contained" color="secondary">Formulario de resultados</Button>
        </Stack>
    );
};

export default ActionButtons;
