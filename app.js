const http = require('http');
const express = require('express')
require('dotenv').config();
require('./config/database').connect();
const cors = require("cors");
const { Server } = require('socket.io')
const app = express();
const server = http.createServer(app);
const cookieParser = require('cookie-parser');
// const credentials = require('./middleware/credentials');
const verifyJWT = require('./middleware/verifyJWT');

const io = new Server(server, {
  cors: {
    origin: ["https://acccord.netlify.app", "http://localhost:3000" ],
    credentials: true,
    methods: ["GET", "POST"],
  } 
})

//routes
const userRoute = require('./routes/user')
const registerRoute = require('./routes/register')
const logoutRoute = require('./routes/logout')
const refreshRoute = require('./routes/refresh')
const serverRoute = require('./routes/api/server')
const channelRoute = require('./routes/channel')
const joinServerRoute = require('./routes/joinServer')

// const homeRoute = require('./routes/home')
// const conversationRoute = require('./routes/conversation');
// const router = require('./routes/api/server');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware for cookies
app.use(cookieParser());

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
// app.use(credentials);

app.use(
    cors({
      origin: ["https://acccord.netlify.app", "http://localhost:3000" ],
      credentials: true,
      methods: ["GET", "POST", "DELETE"],
    })
);

app.use('/signin', userRoute)
app.use('/signup', registerRoute)
app.use('/logout', logoutRoute)
app.use('/refresh', refreshRoute)
app.use(verifyJWT)

app.use('/createServer', serverRoute)
app.use('/addChannel', channelRoute)
app.use('/joinServer', joinServerRoute)
// app.use('/home', homeRoute)
app.use('/conversation', require('./routes/conversation'))

app.use('/newpost', require('./routes/newpost'))
app.use('/message', require('./routes/message'))

app.get('/', (req,res)=>{
  res.send('testing successful')
})

app.get('/favicon.ico', function(req, res) {
  res.writeHead(204);
  res.end();
})

io.on("connection", (socket) => {
  
  socket.on("join_room", (data)=>{
    socket.join(data)
    let users = io.sockets.adapter.rooms.get(data);
    io.in(data).emit("active_user",users.size)
  })
  
  socket.on("send_message", (data)=>{ 
    socket.to(data.channelId).emit("receive_message", data)
  })

  socket.on("disconnect", ()=>{
    console.log('user disconnected')
  })
})

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
})

module.exports = app;
