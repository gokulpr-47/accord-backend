const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema(
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

module.exports = mongoose.model("message", messageSchema)