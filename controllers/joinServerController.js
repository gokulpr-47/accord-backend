import server from '../model/server.js';
import User from '../model/user.js';

export async function joinServer (req, res){
    const { code, email } = req.body;

    try{
        //server that needs to be joined
        const servers = await server.findOne({'_id': code }).exec();
        //detail of the user that needs to be added in the server document
        const user = await User.findOne({'email': email}).exec();

        const userArray = servers.user
        userArray.push(user._id)

        let newValue = { $set: {user: userArray}};

        await servers.updateOne(servers, newValue, () => {
            console.log('updated')
        })
        res.status(201).json({ servers })
    } catch( err ){
        console.log(err)
    }
}

// export default { joinServer }
