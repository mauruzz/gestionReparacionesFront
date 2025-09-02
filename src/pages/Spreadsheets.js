import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import FiltersForm from "../components/FiltersForm";
import FilteredTicketsTable from "../components/FilteredTicketsTable";

function Spreadsheets() {
    const [tickets, setTickets] = useState([]);
    const [filters, setFilters] = useState({});

    const authHeaders = () => {
        const token = localStorage.getItem("token");
        return {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };
    };

    // 🔹 Función para pedir tickets al backend

    //PROBLEMA!!

    const fetchTickets = async (filters = {}) => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        let url = "http://localhost:9000/api/tickets?";
        const params = new URLSearchParams(filters);
        url += params.toString();

        const res = await fetch(url, config);
        const data = await res.json();
        setTickets(data);
    };

    useEffect(() => {
        fetchTickets(); // carga inicial sin filtros
    }, []);

    // 🔹 Manejar el submit del formulario
    const handleFilterSubmit = (newFilters) => {
        setFilters(newFilters);
        fetchTickets(newFilters);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Contenido principal */}
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4">Planillas</h1>
                <FiltersForm onSubmit={handleFilterSubmit} />
                <FilteredTicketsTable tickets={tickets} />
            </div>
        </div>
    );
}

export default Spreadsheets;
