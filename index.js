const app = require('express')(); // Calling teh Express fn once more to givet the Express App
const server = require('http').createServer(app);
const cors = require('cors');
const { Socket } = require( 'socket.io' );

const io = require('socket.io')(server, {
    cors:{
        origin: "*",
        method: ["GET", "POST"]
    }
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => { res.send('Server is running....') });

io.on('connection', (req, res) => {

    socket.emit('me', socket.id); //Emits the user ID to the UI once the connection is successful

    socket.on('disconnected', ()=> socket.broadcast.emit('Call ended.....'));

    socket.on("çalluser", ({ userToCall, signalData, from, name })=>{
        io.to(userToCall).emit("calluser",{ signal: signalData, from, name });
    });

    socket.on("answerçall", (data)=>{
        io.to(data.to).emit("callaccepted", data.signal);
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));