import React from 'react';
import Sidebar from '../components/Sidebar';
import TicketsPanel from '../components/TicketsPanel';

const Dashboard = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ marginLeft: '240px', padding: '20px', width: '100%' }}>
                <h2>Dashboard</h2>
                <TicketsPanel />
            </div>
        </div>
    );
};

export default Dashboard;
