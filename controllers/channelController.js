const dbchats = require('../model/chats')
const User = require('../model/User');
const server = require('../model/server')

const addChannel = async (req,res) => {
    const { channel_name, chats, id, email } = req.body;
    try{
        const result = await dbchats.create({
            "channel_name": channel_name,
            "chats": chats,
            "server_id": id
        })

        res.status(201).json({
            result,
            message: 'Channel Created'
        })
        // console.log(result)
    } catch (err){
        console.log(err)
    }
}

const getChannel = async (req,res) => {
    try{
        const channels = await dbchats.find({'server_id': req.query.server_id}, {"_id": 0, "server_id": 0, "__v": 0}).exec();
        res.status(200).send({channels})
    } catch(err) {
        res.status(500).json({'message': err.message})
    }
}

module.exports = { addChannel, getChannel }