const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",  
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"], 
    credentials: true,  
  }
});

io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  socket.on('mensaje', (data) => {
 
    io.emit('mensaje', {
      mensaje: data.mensaje,
      usuario: data.usuario,
    });
  });


  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
