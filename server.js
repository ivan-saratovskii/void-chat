const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(express.static(path.join(__dirname, 'public')));

// Храним только количество онлайн в каждой комнате — никаких сообщений
const roomUsers = {};

io.on('connection', (socket) => {
  let currentRoom = null;

  socket.on('join', (roomId) => {
    currentRoom = roomId;
    socket.join(roomId);
    roomUsers[roomId] = (roomUsers[roomId] || 0) + 1;
    io.to(roomId).emit('room_info', { online: roomUsers[roomId] });
  });

  // Сервер просто пересылает зашифрованный blob — не читает содержимое
  socket.on('msg', (payload) => {
    if (currentRoom) {
      socket.to(currentRoom).emit('msg', payload);
    }
  });

  socket.on('disconnect', () => {
    if (currentRoom) {
      roomUsers[currentRoom] = Math.max(0, (roomUsers[currentRoom] || 1) - 1);
      io.to(currentRoom).emit('room_info', { online: roomUsers[currentRoom] });
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
