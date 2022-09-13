const User = require('../model/User');
const home = require('../model/home')

const addHome = async (req,res) => {
    const { email } = req.body;
    
    const user = await User.findOne({email}).exec();

    try{
        const result = home.create({
            "owner": user._id
        })
    } catch (err){
        console.log('homeController.js: ', err)
    }
    res.status(201).json({
        message: "home created"
    });
}

const getHome = async (req,res)=>{
    res.staus(201).json({message: 'success'})
}

module.exports = { addHome, getHome }