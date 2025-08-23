import React, {useState} from "react";
import { Box, Stack } from "@mui/material";
import Sidebar from "../components/Sidebar";
import AdminPanel from "../components/AdminPanel";
import './AdminPage.css';

const AdminPage = () => {

    const [collapsed, setCollapsed] = useState(false);

    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar  collapsed={collapsed} setCollapsed={setCollapsed} />
            <Box component="main" sx={{ flexGrow: 1 }} className={`admin-page-content ${collapsed ? "collapsed" : ""}`}>
                <AdminPanel />
            </Box>
        </Box>
    );
};

export default AdminPage;
