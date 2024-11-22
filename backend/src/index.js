import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import { userRouter } from "./routes/users.js";

const PORT = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);
const io = new Server(3000);

app.use(express.json());
app.use(cors());
app.use("/auth", userRouter);
const rooms = new Set(); // Maintain a set of active rooms


mongoose.connect("mongodb://127.0.0.1:27017/chatapp");

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  // Handle room creation
  socket.on('createRoom', (room) => {
    if (!rooms.has(room)) {
      rooms.add(room);
      socket.emit('roomCreated', room);
      console.log(`Room created: ${room}`);
    } else {
      socket.emit('roomExists', room);
    }
  });

  // Handle incoming chat messages
  socket.on("chat message", (message) => {
    const formattedMessage = {
      clientId: message.clientId,
      text: message.text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      username: message.username,
    };

    io.to(message.roomName).emit("chat message", formattedMessage); // Broadcast the message to all connected clients
    console.log(formattedMessage);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});