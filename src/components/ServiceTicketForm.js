// src/components/ServiceTicketForm.js
import React from "react";

const ServiceTicketForm = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <form className="service-ticket-form">
            <label>Fecha de entrada</label>
            <input
                type="date"
                name="entry_date"
                value={formData.entry_date}
                onChange={handleChange}
            />

            <label>Defecto</label>
            <textarea
                name="defect"
                value={formData.defect}
                onChange={handleChange}
            />

            <label>Trabajo realizado</label>
            <textarea
                name="work_done"
                value={formData.work_done}
                onChange={handleChange}
            />

            <label>Presupuesto</label>
            <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
            />

            <label>Costo total</label>
            <input
                type="number"
                name="total_cost"
                value={formData.total_cost}
                onChange={handleChange}
            />

            <label>Fecha de entrega</label>
            <input
                type="date"
                name="delivery_date"
                value={formData.delivery_date}
                onChange={handleChange}
            />

            <label>Comentarios</label>
            <textarea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
            />

            <label>Informe</label>
            <textarea
                name="report"
                value={formData.report}
                onChange={handleChange}
            />
        </form>
    );
};

export default ServiceTicketForm;
