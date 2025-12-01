const express = require('express');
const http = require('http');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});

let conectedPeers = [];

io.on('connection', (socket) => {
    conectedPeers.push(socket.id);
    console.log('User connected ' + conectedPeers);
    socket.on('disconnect', () => {
        console.log('User disconnected');

        const newConnectedPeers = conectedPeers.filter((peerSocketId) => {
            peerSocketId != socket.io;
        });

        conectedPeers = newConnectedPeers;
    });
})

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});