const mongoose = require('mongoose')
const Schema = mongoose.Schema

const homeSchema = new mongoose.Schema({
    friends: [{
        type: Schema.Types.ObjectId
    }],
    owner: {
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('home', homeSchema)