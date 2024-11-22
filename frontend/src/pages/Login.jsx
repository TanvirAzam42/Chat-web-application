import React, { useState } from 'react';
import {
    Button,
    TextField,
    Typography,
    Container,
    Link,
    Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function Login() {
    const [, setCookies] = useCookies(['access_token']);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await axios.post(
                'http://localhost:3001/auth/login',
                {
                    username: username,
                    password: password,
                }
            );

            if (result.status === 200) {
                setUsername('');
                setPassword('');
                setErrorMessage('');
                setCookies('access_token', result.data.token);
                localStorage.setItem('userID', result.data.userID);
                localStorage.setItem('username', username);
                navigate('/');
            } else {
                // Error handling
            }
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
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        size="small"
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        size="small"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: 20 }}
                    >
                        Login
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
                    Don't have an account?{' '}
                    <Link href="register" color="primary">
                        Create Account
                    </Link>
                </Typography>
            </Container>
        </Box>
    );
}

export default Login;
