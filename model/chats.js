const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new mongoose.Schema({
    channel_name: {
        type: String,
    },
    chats:[{
        name: String,
        message: String
    }], 
    server_id: {
        type: String
    }
})

module.exports = mongoose.model("chat", chatSchema);

// {
//     from: "chats",
//     localField: "_id",
//     foreignField: "server_id",
//     as: "result"
// }