import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TicketsPanel = () => {
    const [latestTickets, setLatestTickets] = useState([]);
    const [unfinishedTickets, setUnfinishedTickets] = useState([]);
    const [budgetPendingTickets, setBudgetPendingTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };

                const [all, unfinished, budget] = await Promise.all([
                    axios.get('http://localhost:9000/api/service_ticket/all', config),
                    axios.get('http://localhost:9000/api/service_ticket/all', config),
                    axios.get('http://localhost:9000/api/service_ticket/all', config)
                ]);

                setLatestTickets(all.data);
                setUnfinishedTickets(unfinished.data);
                setBudgetPendingTickets(budget.data);
            } catch (error) {
                console.error('Error al cargar tickets:', error);
            }
        };

        fetchTickets();
    }, []);

    return (
        <div>
            <TicketTable title="Últimos 50 Tickets" tickets={latestTickets} />
            <TicketTable title="Tickets no finalizados" tickets={unfinishedTickets} />
            <TicketTable title="Tickets por presupuestar" tickets={budgetPendingTickets} editableField="instrument.notice" />
        </div>
    );
};

const TicketTable = ({ title, tickets, editableField }) => {
    return (
        <div style={{ marginBottom: '40px' }}>
            <h3>{title}</h3>
            <table border="1" cellPadding="5" style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        {editableField && <th>Nota</th>}
                    </tr>
                </thead>
                <tbody>
                    {tickets.map(ticket => (
                        <tr key={ticket.id}>
                            <td>{ticket.id}</td>
                            <td>{ticket.client?.name}</td>
                            <td>{ticket.date}</td>
                            <td>{ticket.status}</td>
                            {editableField && (
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ticket.instrument?.notice || ''}
                                        onBlur={(e) => {
                                            // Aquí luego podés hacer la llamada para actualizar el campo
                                            console.log('Nuevo valor:', e.target.value);
                                        }}
                                    />
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TicketsPanel;
