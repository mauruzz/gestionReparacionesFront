// src/components/ServiceTicketStub.js
import React from "react";

const ServiceTicketStub = ({ formData }) => {
    return (
        <div className="service-ticket-stub">
            <h3>Talón de seguimiento</h3>
            <p><strong>ID:</strong> {formData.id_service_ticket}</p>
            <p><strong>Cliente:</strong> {formData.client?.name || "N/A"}</p>
            <p><strong>Instrumento:</strong> {formData.instrument?.name || "N/A"}</p>
            <p><strong>Fecha de entrada:</strong> {formData.entry_date}</p>
            <p><strong>Defecto:</strong> {formData.defect}</p>
        </div>
    );
};

export default ServiceTicketStub;
