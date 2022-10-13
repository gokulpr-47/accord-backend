import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

const {MONGO_URI} = process.env;

export default async function connect () {
    try{
        await mongoose.connect(MONGO_URI)
        .then(()=>{
            console.log('successfully connected to database');
        })
        .catch((error)=>{
            console.log('database connecction failed. exiting now....');
            console.log(error);
            process.exit(1);
        })
    } catch(err){
        console.log(err)
    }
}
