import React, { useState } from "react";
import {Box, Button, Stack} from "@mui/material";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import BuildIcon from "@mui/icons-material/Build";
import PeopleIcon from "@mui/icons-material/People";

import StatusTab from "./tabs/StatusTab";
import DefectTab from "./tabs/DefectTab";
import WorkDoneTab from "./tabs/WorkDoneTab";
import UserTab from "./tabs/UserTab";

const AdminPanel = () => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Box sx={{ width: "100%" }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <Pill
                    active={tabIndex === 0}
                    icon={<SettingsIcon />}
                    label="Estados"
                    onClick={() => setTabIndex(0)}
                />
                <Pill
                    active={tabIndex === 1}
                    icon={<LibraryBooksOutlinedIcon />}
                    label="Defectos"
                    onClick={() => setTabIndex(1)}
                />
                <Pill
                    active={tabIndex === 2}
                    icon={<BuildIcon />}
                    label="Trabajos"
                    onClick={() => setTabIndex(2)}
                />
                <Pill
                    active={tabIndex === 3}
                    icon={<PeopleIcon />}
                    label="Usuarios"
                    onClick={() => setTabIndex(3)}
                />
            </Stack>

            <div>
                {tabIndex === 0 && <StatusTab />}
                {tabIndex === 1 && <StatusTab />}
                {tabIndex === 2 && <StatusTab />}
                {tabIndex === 3 && <StatusTab />}
            </div>
        </Box>
    );
};

const Pill = ({ icon, label, active, onClick }) => (
    <Button
        variant={active ? 'contained' : 'outlined'}
        size="large"
        sx={{
            borderRadius: '18px',
            textTransform: 'none',
            background: active ? '#111' : '#fff',
            color: active ? '#fff' : '#333',
            borderColor: '#e0e0e0',
            boxShadow: 'none'
        }}
        startIcon={icon}
        onClick={onClick}
    >
        {label}
    </Button>
);

export default AdminPanel;
