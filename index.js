// import libraries
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// create app
const app = express();

// create server
const server = http.createServer(app);

// create socket
const io = socketIO(server);

// set up express routes
app.get('/customer', (req, res) => {
    res.sendFile(__dirname + '/' + 'index.html')
});

app.get('/shop', (req, res) => {
    res.sendFile(__dirname + '/shop.html');
});

// set up socket connection
io.on('connection', (socket) => {
    // console.log('a user connected');
    
    // send message to all connected clients
    socket.on('chat message', (msg) => {
        // console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    
    // disconnect
    socket.on('disconnect', () => {
        // console.log('user disconnected');
    });
});

// start server
server.listen(3000, () => {
  console.log('listening on *:3000');
});
