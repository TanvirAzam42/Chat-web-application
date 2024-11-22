import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Link, Stack } from '@mui/material';
import { Cookies } from 'react-cookie';
import { Container, Typography, Button } from '@mui/material';

function Home() {
    const cookies = new Cookies();
    const cookie = cookies.get('access_token');
    const userID = localStorage.getItem('userID');
    const navigate = useNavigate();

    if (!cookie) {
        return (
            <Stack textAlign="center" justifyContent="center" height="90vh">
                <Typography variant="h4" gutterBottom>
                    <Link href="login">Login First!</Link>
                </Typography>
            </Stack>
        );
    } else {
        return (
            <Grid
                container
                spacing={4}
                justifyContent="center"
                alignItems="center"
            >
                <Grid
                    item
                    xs={12}
                    container
                    justifyContent="center"
                    alignItems="center"
                    margin={16}
                >
                    <Typography variant="h2" gutterBottom>
                        Discussion Room
                    </Typography>
                </Grid>
                <Grid item container spacing={2} justifyContent="center">
                    <Grid item xs={6} sm={4}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                navigate('/create');
                            }}
                        >
                            Create Room
                        </Button>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                navigate('/discuss');
                            }}
                        >
                            Join Room
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default Home;
