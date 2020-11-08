require('dotenv').config()
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const helmet = require('helmet');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const twitchTrack = require('./libs/twitch/index');
let socketsAuth = []

mongoose.connect(process.env.DATA_BASE_STRING_CONN || 'mongodb://localhost/twitch-word-seeker', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('Database Running [OK]'))
    .catch((err) => console.log('Error connecting to database' + err))

const userRoute = require('./routes/users');
const streamRoute = require('./routes/streams')

app.use(express.static('./public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_KEY || 'algosupersecreto',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: process.env.COOKIE_MAX_AGE || 1000 * 60 * 60 * 24 * 30 }
}));

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

    socket.on('disconnect', (socket) =>{
        console.log("off")
        console.log(socket)
        fs.writeFileSync('./transcript.json',JSON.stringify(transcript),'utf-8')
    });
})

app.use('/api/user', userRoute)
app.use('/api/stream', streamRoute)

server.listen(3000, () => {
    console.log('Server OK')
})