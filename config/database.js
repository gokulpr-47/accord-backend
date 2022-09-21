const mongoose = require('mongoose')

const {MONGO_URI} = process.env;

console.log(MONGO_URI);

exports.connect = () => {
    mongoose
        .connect(MONGO_URI)
        .then(()=>{
            console.log('successfully connected to database');
        })
        .catch((error)=>{
            console.log('database connecction failed. exiting now....');
            console.log(error);
            process.exit(1);
        })
}
