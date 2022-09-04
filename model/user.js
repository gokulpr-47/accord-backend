const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        default: null
    },
    email: {
        index: true,
        unique: true,
        type: String,
    },
    password: {
        type: String
    },
    refreshToken: [String]
})

module.exports = mongoose.model("user", userSchema);