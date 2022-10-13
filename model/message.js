import { Schema, model } from "mongoose"

const messageSchema = new Schema(
    {
        channelId: { //channel id
            type: String,
        },
        senderId: {         //current userId
            type: String,
        },
        senderName: {
            type: String,
        },
        chat: {
            type: String,
        },
    },
    { timestamps: true }
)

export default model("message", messageSchema)