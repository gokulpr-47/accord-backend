require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const user = require('./model/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
      methods: ["GET", "POST"],
    })
  );

//importing user context
const User = require('./model/user'); 

const auth = require('./middleware/auth')

app.post('/welcome', auth, (req,res)=>{    
    res.send('welcome')
})

//Register
app.post('/signup', async (req, res)=>{
    try{
        console.log("entered")
        //get user input
        const {username, email, password } = req.body;

        //validate user input
        if(!(username&&email&&password)){
            res.status(400).send("All input is required");
        }

        //check if the user already exists
        //validate if user exist in our database
        const oldUser = await User.findOne({email});

        //encrypt user password
        encryptedPassword = await bcrypt.hash(password,10);

        //create user in our database
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password: encryptedPassword,
        })

        //create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        //save user token
        user.token = token;
        
        //return new user
        res.status(201).json(user);
    } catch(err){
        console.log(err);
    }
})

//Login
app.post('/signin', async (req,res)=>{
    try{
        console.log('entered login')
        //get user input
        const { email,password } = req.body;

        //validate user input
        if(!(email&&password)){
            res.status(400).send("All input is required");
        }

        //validate if user exist in our database
        const user = await User.findOne({email});

        if(user&&(await bcrypt.compare(password, user.password))){
            //Create token
            const token = jwt.sign(
                {
                    user_id: user._id, 
                    email
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            user.token = token;

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(user);
        }
        else{
            res.status(400).send("Invalid Credentials");
        }
    } catch (err){
        console.log(err);
    }
})

module.exports = app;