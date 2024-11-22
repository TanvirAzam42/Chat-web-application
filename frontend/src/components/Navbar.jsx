import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ChatIcon from '@mui/icons-material/Chat';
const Navbar = () => {
    const logout = () => {
        setCookies('access_token', '');
        window.localStorage.removeItem('userID');
        window.localStorage.removeItem('username');
        navigate('/login');
    };
    const [cookies, setCookies] = useCookies(['access_token']);
    const navigate = useNavigate();
    return (
        <AppBar position="static">
            <Toolbar
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <ChatIcon />
                <Typography variant="h6">Priv Chat</Typography>

                {!cookies.access_token ? (
                    <Button component={Link} to={'/login'} color="inherit">
                        Login/Register
                    </Button>
                ) : (
                    <Button onClick={logout} color="inherit">
                        Logout
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
