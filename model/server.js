import { Schema as _Schema, model } from 'mongoose'
const Schema = _Schema

const serverSchema = new _Schema({
    server_name:{
        type: String
    },
    channels: [{
        type: Schema.Types.ObjectId,
        ref: 'chat'
    }],
    user: [{
        type: String
    }],
    id: String
})

export default model("server", serverSchema)

// {
//     from: "servers",
//     localField: "_id",
//     foreignField: "user",
//     as: "result"
// }