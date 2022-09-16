const message = require('../model/message')
const User = require('../model/User')

//add message(post)
const addMessage = async (req,res) => {
    try {
        let {channelId, senderId, chat} = req.body
        const findUser = await User.findOne({"_id": senderId}).exec()
        console.log('finduser: ',findUser)
        const savedMessage = await message.create({
            "channelId": channelId,
            "senderId": senderId,
            "chat": chat,
            "senderName": findUser.username
        })
        console.log('saved message: ', savedMessage)
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
}

//get /message/:channelId
const getMessage = async (req,res) => {
    try{
        console.log("channelId : ", req)
        const getmessage = await message.find({"channelId": req.params.channelId}, {
            "_id": 0, "channelId": 0, "senderId": 0, "__v":0
        })
        console.log(getmessage)
        res.status(200).json(getmessage)
    } catch(err) {
        res.status(500).json(err)
    }
}

module.exports = { addMessage, getMessage }