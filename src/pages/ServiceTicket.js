import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import ServiceTicketForm from "../components/ServiceTicketForm";
import ServiceTicketStub from "../components/ServiceTicketStub";
import ActionButtons from "../components/ActionButtons";
import { Box, Typography, CircularProgress } from "@mui/material";


const ServiceTicket = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const [formData, setFormData] = useState({
        id_service_ticket: "",
        entry_date: "",

        defect: "",
        budget: "",
        work_done: "",
        total_cost: "",
        comments: "",

        // opcionales, por ahora vacíos
        delivery_date: "",
        report: "",

        // anidados
        user: {
            id_user: localStorage.getItem("id_user") || "",
        },
        client: {
            name: "",
            email: "",
            phone: "",
        },
        instrument: {
            product: "",
            brand: "",
            model: "",
            serial_number: "",
            purchase_date: "",
            warranty: true,
            notice: "",
        },
        status: {
            id_status: ''
        }
    });

    useEffect(() => {
        const fetchInitialStatus = async () => {
            try {
                const response = await fetch("http://localhost:9000/api/status/initial_status", {
                    method: "GET",
                    headers: authHeaders(),
                });
                if (!response.ok) {
                    throw new Error("Error al obtener el status inicial");
                }
                const data = await response.json();

                setFormData((prev) => ({
                    ...prev,
                    status: { id_status: data.id_status }
                }));
            } catch (error) {
                console.error("No se pudo cargar el status inicial:", error);
            }
        };
        fetchInitialStatus();
    }, []);

    useEffect(() => {
        const fetchTicket = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:9000/api/service_ticket/${id}`, {
                        method: "GET",
                        headers: authHeaders(),
                    }
                );
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching ticket:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTicket();
    }, [id]);



    // refs para imprimir
    const formRef = useRef(null);
    const stubRef = useRef(null);

    const authHeaders = () => {
        const token = localStorage.getItem("token");
        return {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };
    };

    const handleSubmit = async () => {
        console.log(formData);
        try {
            const res = await fetch(
                "http://localhost:9000/api/service_ticket/save",
                {
                    method: "POST",
                    headers: authHeaders(),
                    body: JSON.stringify(formData),
                }
            );
            if (!res.ok) throw new Error("Error al guardar");
            const saved = await res.json().catch(() => null);
            // si el back devuelve el objeto creado, tomamos su id
            if (saved?.id_service_ticket) {
                setFormData((prev) => ({
                    ...prev,
                    id_service_ticket: saved.id_service_ticket,
                }));
            }
            alert("Service Ticket guardado correctamente");
        } catch (e) {
            console.error(e);
            alert("No se pudo guardar el ticket");
        }
    };

    const handleUpdate = async () => {
        // suponemos endpoint PUT /api/service_ticket/{id}
        if (!formData.id_service_ticket) {
            alert("Primero guarde el ticket para obtener un ID.");
            return;
        }
        try {
            const res = await fetch(
                `http://localhost:9000/api/service_ticket/${formData.id_service_ticket}`,
                {
                    method: "PUT",
                    headers: authHeaders(),
                    body: JSON.stringify(formData),
                }
            );
            if (!res.ok) throw new Error("Error al actualizar");
            alert("Service Ticket actualizado");
        } catch (e) {
            console.error(e);
            alert("No se pudo actualizar el ticket");
        }
    };

    // utilitario de impresión: abre una ventana con contenido recibido y dispara print
    const printNode = (node, title = "Imprimir") => {
        if (!node) return;
        const html = node.innerHTML;
        const win = window.open("", "_blank", "width=900,height=700");
        if (!win) return;

        win.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <style>
            body { font-family: Roboto, Arial, sans-serif; padding: 16px; }
            .print-card { page-break-inside: avoid; }
            @media print { .no-print { display: none !important; } }
          </style>
        </head>
        <body>${html}</body>
      </html>
    `);
        win.document.close();
        win.focus();
        win.print();
        win.close();
    };

    const handlePrintAll = () => {
        // construimos un contenedor temporal que combine formulario + talón
        const container = document.createElement("div");
        container.innerHTML = `
      <div class="print-card">${formRef.current?.innerHTML || ""}</div>
      <hr/>
      <div class="print-card">${stubRef.current?.innerHTML || ""}</div>
    `;
        printNode(container, "ServiceTicket - Completo");
    };

    const handlePrintForm = () => printNode(formRef.current, "ServiceTicket - Nota");
    const handlePrintStub = () => printNode(stubRef.current, "ServiceTicket - Talón");

    const goToResultsForm = () => {
        // navega a otra ruta (ajusta si usás useNavigate)
        window.location.href = "/results-form";
    };

    if (loading) return <CircularProgress />;

    return (
        <div className="dashboard-container">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <main className={`dashboard-content ${collapsed ? "collapsed" : ""}`}>
                {/*
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        Nota de inspección
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        subtitulo
                    </Typography>
                </Box>
                */}

                {/* Formulario (primero) */}
                <div ref={formRef}>
                    <ServiceTicketForm formData={formData} setFormData={setFormData} />
                </div>

                {/* Botonera (después del form) */}
                <Box sx={{ mt: 2 }}>
                    <ActionButtons
                        onSubmit={handleSubmit}
                        onUpdate={handleUpdate}
                        onPrintAll={handlePrintAll}
                        onPrintForm={handlePrintForm}
                        onPrintStub={handlePrintStub}
                        onGoToResults={goToResultsForm}
                    />
                </Box>

                {/* Talón (oculto visualmente, pero listo para imprimir) */}
                <div style={{ position: "absolute", left: "-99999px", top: 0 }}>
                    <div ref={stubRef}>
                        <ServiceTicketStub formData={formData} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ServiceTicket;
