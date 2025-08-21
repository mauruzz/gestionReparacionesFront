import React from "react";
import { Stack, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import UpdateIcon from "@mui/icons-material/Update";
import PrintIcon from "@mui/icons-material/Print";
import DescriptionIcon from "@mui/icons-material/Description";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AssignmentIcon from "@mui/icons-material/Assignment";

const ActionButtons = ({
                           onSubmit,
                           onUpdate,
                           onPrintAll,
                           onPrintForm,
                           onPrintStub,
                           onGoToResults,
                       }) => {
    return (
        <Stack className={'no-print'} direction="row" spacing={1} justifyContent="flex-end" flexWrap="wrap">
            <Button variant="contained" startIcon={<SendIcon />} onClick={onSubmit}>
                Enviar
            </Button>
            <Button variant="outlined" startIcon={<UpdateIcon />} onClick={onUpdate}>
                Actualizar
            </Button>
            <Button variant="outlined" startIcon={<PrintIcon />} onClick={onPrintAll}>
                Imprimir todo
            </Button>
            <Button variant="outlined" startIcon={<DescriptionIcon />} onClick={onPrintForm}>
                Imprimir nota
            </Button>
            <Button variant="outlined" startIcon={<ReceiptLongIcon />} onClick={onPrintStub}>
                Imprimir talón
            </Button>
            <Button variant="outlined" startIcon={<AssignmentIcon />} onClick={onGoToResults}>
                Formulario de resultados
            </Button>
        </Stack>
    );
};

export default ActionButtons;
