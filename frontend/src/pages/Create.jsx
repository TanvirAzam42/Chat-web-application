import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import io from 'socket.io-client';

const Create = () => {
    const [roomName, setRoomName] = useState('');
    const navigate = useNavigate();

    const handleClick = () => {
        if (roomName.trim() !== '') {
            const socket = io('http://localhost:3000', {
                transports: ['websocket'],
                withCredentials: false,
            });

            // Emit an event to create the room
            socket.emit('createRoom', roomName);

            // You might want to handle the response from the server
            socket.on('roomCreated', (createdRoom) => {
                console.log(`Room created: ${createdRoom}`);
                // Handle any additional logic if needed
                navigate('/discuss');
            });

            socket.on('roomExists', (existingRoom) => {
                console.log(`Room already exists: ${existingRoom}`);
                // Handle any additional logic if needed
            });
        }
    };

    return (
        <Stack
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="90vh"
            spacing={4}
        >
            <Typography variant="h2"> Create Room </Typography>
            <TextField
                size="small"
                label="Enter Room Name"
                onChange={(e) => setRoomName(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleClick}>
                {' '}
                Create
            </Button>
        </Stack>
    );
};

export default Create;
