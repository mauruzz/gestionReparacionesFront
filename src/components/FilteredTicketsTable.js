import React from "react";
import * as XLSX from "xlsx";

function FilteredTicketsTable({ tickets }) {
    // 🔹 Exportar a Excel desde el front
    const handleExportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(tickets);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Tickets");
        XLSX.writeFile(workbook, "planilla.xlsx");
    };

    return (
        <div className="bg-white p-4 shadow rounded">
            <div className="flex justify-between mb-2">
                <h2 className="text-lg font-semibold">Resultados</h2>
                <button onClick={handleExportExcel} className="bg-green-600 text-white px-3 py-1 rounded">
                    Exportar Excel
                </button>
            </div>
            <table className="min-w-full border">
                <thead className="bg-gray-100">
                <tr>
                    <th className="border px-2 py-1">ID</th>
                    <th className="border px-2 py-1">Cliente</th>
                    <th className="border px-2 py-1">Producto</th>
                    <th className="border px-2 py-1">Modelo</th>
                    <th className="border px-2 py-1">Fecha</th>
                    <th className="border px-2 py-1">Estado</th>
                </tr>
                </thead>
                <tbody>
                {tickets.length > 0 ? (
                    tickets.map((t) => (
                        <tr key={t.id}>
                            <td className="border px-2 py-1">{t.id}</td>
                            <td className="border px-2 py-1">{t.client?.name}</td>
                            <td className="border px-2 py-1">{t.instrument?.product}</td>
                            <td className="border px-2 py-1">{t.instrument?.model}</td>
                            <td className="border px-2 py-1">{t.entry_date}</td>
                            <td className="border px-2 py-1">{t.status?.name}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="text-center py-2">No hay resultados</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default FilteredTicketsTable;
