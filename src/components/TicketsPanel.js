// src/components/TicketsPanel.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Tab,
    Tabs,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Chip,
    Button,
    Stack,
    IconButton,
    Typography, responsiveFontSizes
} from '@mui/material';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
import BackupIcon from '@mui/icons-material/Backup';
import './TicketsPanel.css';

const TicketsPanel = () => {
    const [tickets, setTickets] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const res = await axios.get('http://localhost:9000/api/service_ticket/all', config);
                setTickets(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error('Error al cargar tickets', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    // Derivados
    const latestTickets = [...tickets]
        .sort((a, b) => (b.id_service_ticket || 0) - (a.id_service_ticket || 0))
        .slice(0, 50);

    const unfinishedTickets = tickets.filter(t => {
        const status = t.status?.description.toLowerCase() || 'Pendiente';
        return !(status === 'finalizado' || status === 'entregado' || status === 'done' || status === 'paid');
    });

    const budgetPendingTickets = tickets.filter(t => {
        // Presupuesto pendiente: presupuesto vacío o null o costo_total == null
        return (!t.presupuesto && !t.budget) || (t.presupuesto === '' || t.budget === '' || t.presupuesto == null && t.budget == null);
    });

    const handleTabChange = (e, v) => setTabIndex(v);

    return (
        <Box sx={{ width: '100%'}}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <Pill
                    active={tabIndex === 0}
                    icon={<LibraryBooksOutlinedIcon />}
                    label="Últimos 50 Tickets"
                    onClick={() => setTabIndex(0)}
                />
                <Pill
                    active={tabIndex === 1}
                    icon={<PendingActionsOutlinedIcon />}
                    label="Tickets no finalizados"
                    onClick={() => setTabIndex(1)}
                />
                <Pill
                    active={tabIndex === 2}
                    icon={<PriceChangeOutlinedIcon />}
                    label="Tickets por presupuestar"
                    onClick={() => setTabIndex(2)}
                />
            </Stack>

            <div>
                {tabIndex === 0 && <TicketTable tickets={latestTickets} loading={loading} />}
                {tabIndex === 1 && <TicketTable tickets={unfinishedTickets} loading={loading} />}
                {tabIndex === 2 && <TicketTable tickets={budgetPendingTickets} loading={loading} editableField />}
            </div>
        </Box>
    );
};

const Pill = ({ icon, label, active, onClick }) => (
    <Button
        variant={active ? 'contained' : 'outlined'}
        size="large"
        sx={{
            borderRadius: '18px',
            textTransform: 'none',
            background: active ? '#111' : '#fff',
            color: active ? '#fff' : '#333',
            borderColor: '#e0e0e0',
            boxShadow: 'none'
        }}
        startIcon={icon}
        onClick={onClick}
    >
        {label}
    </Button>
);

const TicketTable = ({ tickets = [], editableField = false, loading = false }) => {
    const handleNoticeSave = async (instrumentId, value) => {
        // Placeholder: intenta hacer PATCH al endpoint de instrument (ajustá la URL real)
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            // endpoint hipotético: PATCH /api/instruments/{id}
            await axios.patch(`http://localhost:9000/api/instruments/${instrumentId}`, { notice: value }, config);
            // podrías mostrar un toast o actualizar el array local para mostrar cambio inmediato
        } catch (err) {
            console.error('Error actualizando notice', err);
        }
    };

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <TableContainer component={Paper} className="tickets-table-container">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Cliente</TableCell>
                        <TableCell>Producto</TableCell>
                        <TableCell>Modelo</TableCell>
                        <TableCell align="right">Costo</TableCell>
                        {editableField && <TableCell>Nota</TableCell>}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {tickets.map(t => {
                        const id = t.id_service_ticket ?? t.id ?? t.idOrder;
                        const date = t.entry_date ? formatDate(t.entry_date) : '-';
                        const status = t.status?.description || 'Pendiente';
                        const clientName = t.client?.name || t.clientName || '-';
                        const product = t.instrument?.product || '-';
                        const model = t.instrument?.model || '-';
                        const cost = t.total_cost ?? t.costo_total ?? t.totalCost ?? 0;
                        const instrumentId = t.instrument?.id_instrument ?? t.instrument?.id;

                        return (
                            <TableRow key={id} hover>
                                <TableCell>#{id}</TableCell>
                                <TableCell>{date}</TableCell>
                                <TableCell>
                                    <StatusChip status={status} />
                                </TableCell>
                                <TableCell>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <Avatar sx={{ width: 32, height: 32 }}>{(clientName || 'U').charAt(0).toUpperCase()}</Avatar>
                                        <div>{clientName}</div>
                                    </div>
                                </TableCell>
                                <TableCell>{product}</TableCell>
                                <TableCell>{model}</TableCell>
                                <TableCell align="right">{formatCurrency(cost)}</TableCell>
                                {editableField && (
                                    <TableCell>
                                        <input
                                            type="text"
                                            defaultValue={t.instrument?.notice || ''}
                                            onBlur={(e) => handleNoticeSave(instrumentId, e.target.value)}
                                            className="notice-input"
                                        />
                                    </TableCell>
                                )}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

// Helpers

const formatDate = (d) => {
    try {
        const dt = new Date(d);
        return dt.toLocaleDateString();
    } catch {
        return d;
    }
};

const formatCurrency = (v) => {
    if (v == null) return '-';
    try {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(v);
    } catch {
        return v;
    }
};

const StatusChip = ({ status }) => {
    const s = (status || '').toString().toLowerCase();
    let color = 'default';
    if (s.includes('final') || s.includes('paid') || s.includes('entregado')) color = 'success';
    else if (s.includes('cancel') || s.includes('anulado')) color = 'error';
    else if (s.includes('recepcionado') || s.includes('pending')) color = 'warning';
    else color = 'default';

    return <Chip label={status} color={color} size="small" />;
};

export default TicketsPanel;
