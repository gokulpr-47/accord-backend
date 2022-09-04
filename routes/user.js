const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/', authController.handleLogin);

module.exports = router;





// require('dotenv').config();
// const express = require('express');
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const router = express.Router()

// const app = express()

// app.use(express.json())

// //importing user context
// const User = require('../model/user'); 

// const auth = require('../middleware/auth')

// router.get('/welcome', auth, (req,res)=>{    
//     res.send('welcome')
// })

// //Register
// router.post('/signup', async (req, res)=>{
//     try{
//         //get user input
//         const {username, email, password } = req.body;

//         //validate user input
//         if(!(username&&email&&password)){
//             res.status(400).json({message: "All input is required"});
//         }

//         //check if the user already exists
//         //validate if user exist in our database
//         const oldUser = await User.findOne({email});

//         //encrypt user password
//         encryptedPassword = await bcrypt.hash(password,10);

//         //create user in our database
//         const user = await User.create({
//             username,
//             email: email.toLowerCase(),
//             password: encryptedPassword,
//         })

//         if(oldUser == 'null'){
//             console.log('already exists')
//         }

//         //create token
//         const token = jwt.sign(
//             { user_id: user._id, email },
//             process.env.TOKEN_KEY,
//             {
//                 expiresIn: "2h",
//             }
//         );

//         //save user token
//         user.token = token;
        
//         //return new user
//         res.status(201).json({ 
//             user,
//             message: 'successfully authenticated',
//             loggedIn: true
//         });
//     } catch(err){
//         console.log(err);
//     }
// })

// //Login
// router.post('/signin', async (req,res)=>{
//     try{
//         console.log('entered login')
        
//         //get user input
//         const { email,password } = req.body;

//         //validate user input
//         if(!(email&&password)){
//             res.setHeader('Content-Type', 'application/json');
//             res.status(400).send("All input is required");
//         }

//         //validate if user exist in our database
//         const user = await User.findOne({email});
//         console.log(user.username)

//         if(user&&(await bcrypt.compare(password, user.password))){
//             //Create token
//             const token = jwt.sign(
//                 {
//                     user_id: user._id, 
//                     email
//                 },
//                 process.env.TOKEN_KEY,
//                 {
//                     expiresIn: "2h",
//                 }
//             );

//             user.token = token;

//             res.setHeader('Content-Type', 'application/json');
//             res.status(200).json({ 
//                 user,
//                 message: 'successfully authenticated',
//                 loggedIn: true
//             });
//         }
//         else{
//             res.status(400).send("Invalid Credentials");
//         }
//     } catch (err){
//         console.log(err);
//     }
// })

// module.exports = router;