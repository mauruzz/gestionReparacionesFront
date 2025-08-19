import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from './pages/Dashboard';
import LoginPage from "./pages/LoginPage";
import ServiceTicket from "./pages/ServiceTicket"

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                    <Route path="/dashboard" element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } />
                    <Route path="/service-ticket" element={
                            <ServiceTicket />}/>
                    <Route path="/service-ticket/:id" element={<ServiceTicket />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}
export default App;
