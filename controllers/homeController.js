import { findOne } from '../model/user.js';
import { create } from '../model/home.js';

const addHome = async (req,res) => {
    const { email } = req.body;
    
    const user = await findOne({email}).exec();

    try{
        const result = create({
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

export default { addHome, getHome }
