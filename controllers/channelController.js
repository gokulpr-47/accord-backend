import chat from '../model/chats.js';
// import User from '../model/user.js';
import server from '../model/server.js';

export async function addChannel (req,res){
    const { channel_name, chats, id, email } = req.body;

    const dbserver = await server.findOne({"_id": id}).exec();

    try{
        const result = await chat.create({
            "channel_name": channel_name,
            "chats": chats,
            "server_id": id
        })

        const prevChannels = dbserver.channels
        dbserver.channels = [...prevChannels, result.id]
        const save = await dbserver.save();
        console.log('save channels: ', save)

        res.status(201).json({
            result,
            message: 'Channel Created'
        })
    } catch (err){
        console.log(err)
    }
}

export async function getChannel (req,res) {
    try{
        const channels = await chat.find({'server_id': req.query.server_id}, {"_id": 0, "server_id": 0, "__v": 0}).exec();
        res.status(200).send({channels})
    } catch(err) {
        res.status(500).json({'message': err.message})
    }
}

// export default { addChannel, getChannel }
