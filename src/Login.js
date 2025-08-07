import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Link, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9000/auth/login', { username, password });
            const { token, username: name, role } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('username', name);
            localStorage.setItem('role', role);
            navigate('/dashboard');
        } catch {
            setError('Credenciales inválidas');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ mt: 12, p: 4 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Iniciar sesión
                </Typography>
                <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        label="Usuario"
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Contraseña"
                        type="password"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                        Ingresar
                    </Button>
                    <Box textAlign="center" sx={{ mt: 2 }}>
                        <Link href="#" variant="body2">
                            ¿Olvidó su contraseña?
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;