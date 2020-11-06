const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const twitchTrack = require('./libs/twitch/index');
let socketsAuth = []

app.use(express.static('./public'))

io.on('connection', async (socket) => {
    socketsAuth.push({ id: socket.conn.id, token: socket.handshake.query.token })
    console.log(socketsAuth[socketsAuth.length - 1])
    let newStreamer = new twitchTrack('zok3r',socket.handshake.query.token)

    await newStreamer.getTwitchTimestamp()
    setInterval(() => {
        console.log(newStreamer.cronoValue)
        socket.emit('time', newStreamer.cronoValue)
    }, 1000);

    socket.on('caption', (body) => {
        console.log(socket.handshake.query.token)
        console.log(body)
        socketsAuth.forEach(list => {
            if (body.token == list.token) {
                socket.to(list.id).broadcast.emit('caption', body);
            }
        });
    })
})

server.listen(3000, () => {
    console.log('Server OK')
})
