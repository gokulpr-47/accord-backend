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
    origin: ["http://localhost:3000"],
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
      origin: ["http://localhost:3000"],
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

io.on("connection", (socket) => {

  socket.on("join_room", (data)=>{
    console.log('joinroom: ',data)
    socket.join(data)
  })
  
  socket.on("send_message", (data)=>{ 
    console.log('send message: ',data)
    socket.to(data.channelId).emit("receive_message", data)
  })
})

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
})

module.exports = app;