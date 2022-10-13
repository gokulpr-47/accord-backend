import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema

const chatSchema = new _Schema(
    {
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
    },
    { timestamps: true }
)

export default model("chat", chatSchema);

// {
//     from: "chats",
//     localField: "_id",
//     foreignField: "server_id",
//     as: "result"
// }