import React, { useState, useEffect } from 'react';
import './index.css';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [mensaje, setMensaje] = useState('');
  const [usuario, setUsuario] = useState('Usuario Nuevo');
  const [nuevoNombre, setNuevoNombre] = useState(''); 
  const [mensajes, setMensajes] = useState([]);

  const enviarMensaje = () => {
    if (mensaje.trim()) {
      const mensajeData = {
        mensaje,
        usuario,
      };
      socket.emit('mensaje', mensajeData);  

      setMensaje('');  
    }
  };
 
 const cambiarNombre = () => {
  if (nuevoNombre.trim()) {
    setUsuario(nuevoNombre); 
    setNuevoNombre('');  
  }
};



  useEffect(() => {
    socket.on('mensaje', (data) => {
      setMensajes((prevMensajes) => [...prevMensajes, data]);
    });

  
    return () => {
      socket.off('mensaje');
    };
  }, []);

  return (
    <div className="App">
      <h1 class="Titulo">Hablemos YA</h1>
      <div className="user-info">
     
      </div>
      <div className="name-change">
        <input
          type="text"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
          placeholder="Ingresa Nombre"
        />
        <button onClick={cambiarNombre}>Nombre</button>
      </div>
      <strong class="usuario-nuevo">Usuario: {usuario}</strong>

      <div className="chat-container">
        <div className="messages">
          {mensajes.map((msg, index) => (
            <div key={index} className="message">
              <strong>{msg.usuario}:</strong> {msg.mensaje}
            </div>
          ))}
        </div>
        <div className="input-area">
          <input
            type="text"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Escribe un mensaje..."
          />
          <button onClick={enviarMensaje}>Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default App;
