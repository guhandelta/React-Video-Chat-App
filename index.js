const app = require('express')(); // Calling teh Express fn once more to givet the Express App
const server = require('http').createServer(app);
const cors = require('cors');

const io = require('socket.io')(server, {
    cors:{
        origin: "*",
        method: ["GET", "POST"]
    }
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => { res.send('Server is running....') })

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));