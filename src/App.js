import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from './pages/Dashboard';
import LoginPage from "./pages/LoginPage";
import ServiceTicket from "./pages/ServiceTicket"
import UserRegister from "./pages/UserRegister"
import AdminPage from "./pages/AdminPage"

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
                    <Route path="/register-ticket" element={
                            <ServiceTicket />}/>
                    <Route path="/register-ticket/:id" element={<ServiceTicket />} />
                    <Route path="/register-user" element={
                        <UserRegister />}/>
                    <Route path="/manage" element={
                        <AdminPage />}/>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}
export default App;
