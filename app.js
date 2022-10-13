import { createServer } from 'http';
import express, { json, urlencoded } from 'express';
import dotenv from 'dotenv'
dotenv.config()
// require('./config/database').connect();
import database from './config/database.js'
database();
import cors from "cors";
import { Server } from 'socket.io';
const app = express();
const server = createServer(app);
import cookieParser from 'cookie-parser';
// const credentials = require('./middleware/credentials');
import verifyJWT from './middleware/verifyJWT.js';

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000" ],
    credentials: true,
    methods: ["GET", "POST"],
  } 
})
//routes
import userRoute from './routes/user.js';
import registerRoute from './routes/register.js';
import logoutRoute from './routes/logout.js';
import refreshRoute from './routes/refresh.js';
import serverRoute from './routes/api/server.js';
import channelRoute from './routes/channel.js';
import joinServerRoute from './routes/joinServer.js';
import conversationRoute from './routes/conversation.js'
import newPostRoute from './routes/newpost.js'
import messageRoute from './routes/message.js'

// const homeRoute = require('./routes/home')
// const router = require('./routes/api/server');

app.use(json());
app.use(urlencoded({ extended: true }));

//middleware for cookies
app.use(cookieParser());

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
// app.use(credentials);

app.use(
    cors({
      origin: ["http://localhost:3000" ],
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
app.use('/conversation', conversationRoute)

app.use('/newpost', newPostRoute)
app.use('/message', messageRoute)

app.get('/', (req,res)=>{
  res.send('testing successful')
})

app.get('/favicon.ico', function(req, res) {
  res.writeHead(204);
  res.end();
})

io.on("connection", (socket) => {
  // console.log('connected: ', socket)
  
  socket.on("join_room", (data)=>{
    console.log('joinroom: ',data , socket.id)
    socket.join(data)
    console.log(io.sockets.adapter.rooms.get(data))
    let users = io.sockets.adapter.rooms.get(data);
    console.log('users: ', users.size);
    console.log('data: ', data)
    io.in(data).emit("active_user",users.size)
  })
  
  socket.on("leave_room", (roomId)=>{
    console.log('entered leave room')
    socket.leave(roomId); 
    console.log(io.sockets.adapter.rooms.get(roomId))
    let data = 'hello';
    socket.to(roomId).emit('user_left', data)
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

export default app;