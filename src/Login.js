import React, { useState } from 'react';
import axios from 'axios';
import logo from './assets/generic-logo.svg';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/auth/login', {
                username,
                password
            });

            const { token, expiresIn, username: name, role } = response.data;

            // Guardar el token en localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('username', name);
            localStorage.setItem('role', role);

            alert('Login exitoso');
            // Redirigir a otra vista, por ejemplo al dashboard (lo agregaremos después)
        } catch (err) {
            setError('Credenciales inválidas');
        }
    };

    return (
        <div style={styles.container}>
            <img src={logo} alt="Logo" style={styles.logo} />
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleLogin} style={styles.form}>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Ingresar</button>
                {error && <p style={styles.error}>{error}</p>}
            </form>
            <p style={styles.forgot}>
                <a href="#">¿Olvidó su contraseña?</a>
            </p>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '80px auto',
        padding: '30px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        fontFamily: 'sans-serif',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '10px',
        marginBottom: '15px',
        fontSize: '16px',
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#1976d2',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
    forgot: {
        marginTop: '15px',
        textAlign: 'center',
    },
    logo: {
        display: 'block',
        margin: '0 auto 20px',
        maxWidth: '150px'
    }
};

export default Login;
