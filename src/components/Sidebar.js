// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import BuildIcon from '@mui/icons-material/Build';
import DescriptionIcon from '@mui/icons-material/Description';
import InventoryIcon from '@mui/icons-material/Inventory';
import BackupIcon from '@mui/icons-material/Backup';
import SpeedIcon from '@mui/icons-material/Speed';

const Sidebar = ({ collapsed, setCollapsed }) => {

    const username = localStorage.getItem('username') || 'Usuario';
    const role = localStorage.getItem('role') || '';

    const toggleSidebar = () => setCollapsed(!collapsed);

    const menuItems = [
        { to: '/dashboard', label: 'Inicio', icon: <HomeIcon /> },
        { to: '/register-user', label: 'Registro usuario', icon: <PersonAddAlt1Icon /> },
        { to: '/register-ticket', label: 'Registro reparación', icon: <InventoryIcon /> },
        { to: '/admin', label: 'Administrar', icon: <BuildIcon /> },
        { to: '/planillas', label: 'Planillas', icon: <DescriptionIcon /> },
        { to: '/cardex', label: 'Cardex', icon: <SpeedIcon /> },
        { to: '/backup', label: 'Backup', icon: <BackupIcon /> },
    ];

    const initials = username ? username.charAt(0).toUpperCase() : 'U';

    return (
        <aside className={`no-print sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className={`sidebar-top ${collapsed ? 'collapsed' : ''}`}>
                {!collapsed &&
                    <div className="brand">
                        <div className="brand-logo">{/* acá podrías poner un svg o logo */}</div>
                    <div className="brand-text">Service</div>
                    </div>
                }
                <IconButton size="small" onClick={toggleSidebar} className="toggle-btn">
                    <MenuIcon />
                </IconButton>
            </div>

            <div className="sidebar-profile">
                <Avatar className="sidebar-avatar">{initials}</Avatar>
                {!collapsed && (
                    <div className="profile-info">
                        <div className="profile-name">{username}</div>
                        <div className="profile-role">{role}</div>
                    </div>
                )}
            </div>

            <nav className="sidebar-nav">
                <ul>
                    {menuItems.map((m) => (
                        <li key={m.to} className="menu-item">
                            <Link to={m.to} className="menu-link">
                                <span className="menu-icon">{m.icon}</span>
                                {!collapsed && <span className="menu-label">{m.label}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="sidebar-footer">
                {!collapsed && <small>Docs</small>}
                <div className="footer-icons">
                    {/* puedes agregar iconos de docs, help, etc */}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
