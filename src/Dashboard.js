// src/Dashboard.js
import React from 'react';

const Dashboard = () => {
    const username = localStorage.getItem('username');

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Bienvenido, {username}</h1>
            <p>Estás en el panel principal.</p>
        </div>
    );
};

export default Dashboard;
