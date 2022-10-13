import { Schema as _Schema, model } from 'mongoose'
const Schema = _Schema

const homeSchema = new _Schema({
    friends: [{
        type: Schema.Types.ObjectId
    }],
    owner: {
        type: Schema.Types.ObjectId
    }
})

export default model('home', homeSchema)