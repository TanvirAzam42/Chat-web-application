import React, { useState } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import {
    Container,
    Typography,
    TextField,
    Button,
    Link,
    Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username.trim() === '' || password.trim() === '') {
            setErrorMessage('Please fill in all fields.');
            return;
        }
        try {
            await axios.post('http://localhost:3001/auth/register', {
                username: username,
                password: password,
            });

            setUsername('');
            setPassword('');
            setErrorMessage('');
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="90vh"
        >
            <Container component="main" maxWidth="xs">
                <Typography variant="h2" style={{ textAlign: 'center' }}>
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        size="small"
                    />

                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        size="small"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: 20 }}
                    >
                        Register
                    </Button>

                    {errorMessage && (
                        <Typography
                            variant="body2"
                            color="error"
                            style={{ marginTop: 20 }}
                        >
                            {errorMessage}
                        </Typography>
                    )}
                </form>

                <Typography style={{ marginTop: 20, textAlign: 'center' }}>
                    Already have an account?{' '}
                    <Link component={RouterLink} to="/login" variant="body2">
                        Login
                    </Link>
                </Typography>
            </Container>
        </Box>
    );
}

export default Register;
