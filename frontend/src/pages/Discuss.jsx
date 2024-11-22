import React, { useState, useRef, useEffect } from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {
    Container,
    TextField,
    Button,
    List,
    ListItem,
    Paper,
} from '@mui/material';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

function Discuss() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [roomName, setRoomName] = useState('');
    const [inRoom, setInRoom] = useState(false); // New state to track room status
    const chatContainerRef = useRef(null);
    const socket = useRef(null);
    const clientId = useRef(null);
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    useEffect(() => {
        socket.current = io('http://localhost:3000', {
            transports: ['websocket'],
            withCredentials: false,
        });

        // Set the client id when the connection is established
        socket.current.on('connect', () => {
            clientId.current = socket.current.id;
        });

        // Use the roomName state to join the room
        if (roomName.trim() !== '' && inRoom) {
            socket.current.emit('joinRoom', roomName);
        }

        socket.current.on('chat message', (message) => {
            displayMessage(message);
        });

        return () => {
            socket.current.disconnect();
        };
    }, [roomName, inRoom]);

    useEffect(() => {
        // Scroll to the bottom when a new message is added
        chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
    }, [messages]);

    const toggleRoom = () => {
        // Toggle the room status
        setInRoom(!inRoom);
        // Clear roomName when leaving the room
        if (!inRoom) {
            setRoomName('');
        }
        navigate('/');
    };

    const sendMessage = () => {
        const messageText = inputMessage.trim();
        if (messageText !== '') {
            const message = {
                clientId: clientId.current,
                text: messageText,
                username: username,
                roomName: roomName,
            };

            socket.current.emit('chat message', message, (acknowledgment) => {
                if (acknowledgment === 'message-received') {
                    displayMessage(message);
                    setInputMessage(''); // Clear the input field.
                }
            });
        }
    };

    const handleInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
            setInputMessage('');
        }
    };

    const handleRoomNameChange = (event) => {
        setRoomName(event.target.value);
    };

    const handleRoomNameKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            // Join or leave the room when the Enter key is pressed
            if (roomName.trim() !== '') {
                socket.current.emit('joinRoom', roomName);
                setInRoom(true);
            } else {
                toggleRoom();
            }
        }
    };

    const displayMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    return (
        <Container
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '50%',
                margin: 'auto',
                height: '90vh',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}
            >
                <TextField
                    id="room-name-input"
                    label="Enter Room Name"
                    variant="outlined"
                    value={roomName}
                    onChange={handleRoomNameChange}
                    onKeyDown={handleRoomNameKeyDown}
                    size="small"
                />
                {inRoom ? (
                    <Button
                        id="leave-room-button"
                        variant="contained"
                        color="secondary"
                        onClick={toggleRoom}
                        style={{ marginLeft: '10px' }}
                    >
                        Leave Room
                    </Button>
                ) : (
                    <Button
                        id="join-room-button"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            // Join the room when the button is clicked
                            if (roomName.trim() !== '') {
                                socket.current.emit('joinRoom', roomName);
                                setInRoom(true);
                            }
                        }}
                        style={{ marginLeft: '10px' }}
                    >
                        Join Room
                    </Button>
                )}
            </div>

            <List
                style={{
                    width: '100%',
                    overflowY: 'auto',
                    height: '70vh',
                    padding: '10px',
                }}
                ref={chatContainerRef}
            >
                {messages.map((message, index) => (
                    <ListItem
                        key={index}
                        style={{
                            display: 'flex',
                            justifyContent:
                                message.clientId === clientId.current
                                    ? 'flex-end'
                                    : 'flex-start',
                            marginBottom: '10px',
                        }}
                    >
                        <Paper
                            style={{
                                padding: '10px',
                                width: '200px',
                                borderRadius: '12px',
                                backgroundColor:
                                    message.clientId === clientId.current
                                        ? '#2196F3'
                                        : '#4CAF50',
                                color: '#fff',
                            }}
                        >
                            <div
                                style={{
                                    marginBottom: '5px',
                                    fontSize: '0.8rem',
                                    color: '#ccc',
                                }}
                            >
                                {message.username} - {message.time}
                            </div>
                            {message.text}
                        </Paper>
                    </ListItem>
                ))}
            </List>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '20px',
                    width: '100%',
                }}
            >
                <TextField
                    id="message-input"
                    label="Type a message"
                    variant="outlined"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    fullWidth
                    size="small"
                    onKeyDown={handleInputKeyDown}
                />
                <Button
                    id="send-button"
                    variant="contained"
                    color="primary"
                    onClick={sendMessage}
                    endIcon={<SendRoundedIcon />}
                    style={{ marginLeft: '10px' }}
                >
                    Send
                </Button>
            </div>
        </Container>
    );
}

export default Discuss;
