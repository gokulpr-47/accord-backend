import message from '../model/message.js'
import user from '../model/user.js'

//add message(post)
const addMessage = async (req,res) => {
    try {
        let {channelId, senderId, chat} = req.body
        const findUser = await user.findOne({"_id": senderId}).exec()
        const savedMessage = await message.create({
            "channelId": channelId,
            "senderId": senderId,
            "chat": chat,   
            "senderName": findUser.username
        })
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
}

//get /message/:channelId
const getMessage = async (req,res) => {
    try{
        const getmessage = await message.find({"channelId": req.params.channelId}, {
            "_id": 0, "channelId": 0, "senderId": 0, "__v":0
        })
        res.status(200).json(getmessage)
    } catch(err) {
        res.status(500).json(err)
    }
}

export default { addMessage, getMessage }
