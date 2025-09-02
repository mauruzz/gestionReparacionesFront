import React, { useState } from "react";

function FiltersForm({ onSubmit }) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [clientName, setClientName] = useState("");
    const [model, setModel] = useState("");
    const [product, setProduct] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ startDate, endDate, clientName, model, product });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-6">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">Fecha desde</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-2 w-full rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Fecha hasta</label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border p-2 w-full rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Cliente</label>
                    <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} className="border p-2 w-full rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Modelo</label>
                    <input type="text" value={model} onChange={(e) => setModel(e.target.value)} className="border p-2 w-full rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Producto</label>
                    <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} className="border p-2 w-full rounded" />
                </div>
            </div>

            <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
                Filtrar
            </button>
        </form>
    );
}

export default FiltersForm;
