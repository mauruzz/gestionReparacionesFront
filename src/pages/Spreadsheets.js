import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import FiltersForm from "../components/FiltersForm";
import FilteredTicketsTable from "../components/FilteredTicketsTable";
import './Spreadsheets.css';
import {Box} from "@mui/material";
import * as XLSX from "xlsx";

function Spreadsheets() {
    const [collapsed, setCollapsed] = useState(false);
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
    const fetchTickets = async (filters = {}) => {
        const token = localStorage.getItem("token");
        let url = "http://localhost:9000/api/service_ticket/filtered_list";

        // Solo agregamos params si tienen valor
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value && value.trim() !== "") {
                queryParams.append(key, value);
            }
        });

        if (queryParams.toString()) {
            url += "?" + queryParams.toString();
        }

        try {
            const res = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token ? `Bearer ${token}` : "",
                },
            });
            console.log(url);
            console.log(res);
            if (!res.ok) {
                console.error("Error al obtener tickets:", res.status, res.statusText);
                setTickets([]);
                return;
            }

            const text = await res.text();
            const data = text ? JSON.parse(text) : [];
            setTickets(data);
        } catch (err) {
            console.error("Error en fetchTickets:", err);
            setTickets([]);
        }
    };

    useEffect(() => {
        fetchTickets(); // carga inicial sin filtros
    }, []);

    // 🔹 Manejar el submit del formulario
    const handleFilterSubmit = (newFilters) => {
        setFilters(newFilters);
        fetchTickets(newFilters);
    };

    const handleExportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(tickets);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Tickets");
        XLSX.writeFile(workbook, "planilla.xlsx");
    };

    return (
        <Box sx={{ display: "flex" }}>
            {/* Sidebar */}
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            {/* Contenido principal */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} className={`spreadsheets-content ${collapsed ? "collapsed" : ""}`}>

                <FiltersForm onSubmit={handleFilterSubmit} onExport={handleExportExcel} />
                <FilteredTicketsTable tickets={tickets} />

            </Box>
        </Box>
    );
}

export default Spreadsheets;
