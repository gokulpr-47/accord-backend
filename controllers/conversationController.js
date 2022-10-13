import conversation from '../model/conversation.js';
import chats from '../model/chats.js';

//new conversation
async function newConversation (req,res){
    const { channelId, senderId } = req.body;
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

async function getConversation (req,res) {
    try{
        const convo = await conversation.find({ members: req.query.channelId})
        res.status(200).json(convo)        
    } catch (err){
        res.status(500).json(err)
    }    
}


export default { newConversation, getConversation }