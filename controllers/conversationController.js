const conversation = require('../model/conversation')
const chats = require('../model/chats')

//new conversation
const newConversation = async (req,res) => {
    const { channelId, senderId } = req.body;
    console.log('entered newConversation')
    try{
        const savedConversation = await conversation.create({
            members: [channelId, senderId]
        })
        res.status(200).json(savedConversation)
    } catch(err){
        res.status(500).json(err)
    }
}

//get conv of a user
//:channelId

const getConversation = async (req,res) => {
    try{
        const convo = await conversation.find({ members: req.query.channelId})
        res.status(200).json(convo)        
    } catch (err){
        res.status(500).json(err)
    }    
}


module.exports = { newConversation, getConversation }