// src/pages/ServiceTicket.js
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ServiceTicketForm from "../components/ServiceTicketForm";
import ServiceTicketStub from "../components/ServiceTicketStub";

const ServiceTicket = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [formData, setFormData] = useState({
        id_service_ticket: "",
        entry_date: "",
        defect: "",
        work_done: "",
        budget: "",
        total_cost: "",
        delivery_date: "",
        comments: "",
        report: "",
        user: {},
        client: {},
        instrument: {}
    });

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:9000/api/service_ticket/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert("Service Ticket guardado correctamente");
            } else {
                alert("Error al guardar");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión");
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch("http://localhost:9000/api/service_ticket/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert("Service Ticket actualizado");
            } else {
                alert("Error al actualizar");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión");
        }
    };

    const handlePrint = (type) => {
        if (type === "all") {
            window.print(); // luego se personaliza
        } else if (type === "form") {
            console.log("Imprimir solo formulario");
        } else if (type === "stub") {
            console.log("Imprimir solo talón");
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <main className={`dashboard-content ${collapsed ? "collapsed" : ""}`}>
                <h1>Service Ticket</h1>
                <div className="service-ticket-actions">
                    <button onClick={handleSubmit}>Enviar</button>
                    <button onClick={() => handlePrint("all")}>Imprimir todo</button>
                    <button onClick={() => handlePrint("form")}>Imprimir nota</button>
                    <button onClick={() => handlePrint("stub")}>Imprimir talón</button>
                    <button onClick={handleUpdate}>Actualizar</button>
                    <button onClick={() => (window.location.href = "/results-form")}>
                        Formulario de resultados
                    </button>
                </div>
                <div className="service-ticket-container">
                    <ServiceTicketForm formData={formData} setFormData={setFormData} />
                    <ServiceTicketStub formData={formData} />
                </div>
            </main>
        </div>
    );
};

export default ServiceTicket;
