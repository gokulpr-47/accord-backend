const mongoose = require('mongoose')
const Schema = mongoose.Schema

const serverSchema = new mongoose.Schema({
    server_name: String,
    channels: [{
        type: String
    }],
    user: [{
        type: String
    }],
    id: String
})

module.exports = mongoose.model("server", serverSchema)

// {
//     from: "servers",
//     localField: "_id",
//     foreignField: "user",
//     as: "result"
// }