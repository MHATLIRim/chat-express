const express = require('express');  
const http = require('http');  
const socketIo = require('socket.io');  

const app = express();  
const server = http.createServer(app);  
const io = socketIo(server);  

// Route de base  
app.get('/', (req, res) => {  
    res.sendFile(__dirname + '/index.html');  
});  

// Gestion des connexions Socket.IO  
io.on('connection', (socket) => {  
    console.log('Un utilisateur est connecté');  

    // Écouter les messages  
    socket.on('message', (msg) => {  
        console.log('Message reçu: ' + msg);  
        // Émettre le message à tous les clients connectés  
        io.emit('message', msg);  
    });  

    // Lors de la déconnexion  
    socket.on('disconnect', () => {  
        console.log('Un utilisateur est déconnecté');  
    });  
});  

// Démarrer le serveur  
const PORT = 3000;  
server.listen(PORT, () => {  
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);  
});