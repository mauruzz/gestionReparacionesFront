// src/pages/Dashboard.js
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TicketsPanel from '../components/TicketsPanel';
import './Dashboard.css';

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="dashboard-container">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <main className={`dashboard-content ${collapsed ? 'collapsed' : ''}`}>
                <TicketsPanel />
            </main>
        </div>
    );
};

export default Dashboard;
