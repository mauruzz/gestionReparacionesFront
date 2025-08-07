import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');

    const toggleSidebar = () => setCollapsed(!collapsed);

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <button onClick={toggleSidebar}>{collapsed ? '➡' : '⬅'}</button>
                {!collapsed && (
                    <div>
                        <p><strong>{username}</strong></p>
                        <p>{role}</p>
                    </div>
                )}
            </div>
            <nav>
                <ul>
                    <li><Link to="/dashboard">Inicio</Link></li>
                    <li><Link to="/user/register">Registro usuario</Link></li>
                    <li><Link to="/ticket/register">Registro reparación</Link></li>
                    <li><Link to="/admin">Administrar</Link></li>
                    <li><Link to="/planillas">Planillas</Link></li>
                    <li><Link to="/cardex">Cardex</Link></li>
                    <li><Link to="/backup">Backup</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
