import user from '../model/user.js';
import { hash } from 'bcrypt';

export async function handleNewUser(req, res) {
    const { username, email, password } = req.body;
        if (!username || !email || ! password) return res.status(400).json({ 'message': 'Username and password are required.' });
    
        // check for duplicate usernames in the db
        const duplicate = await user.findOne({email}).exec();
        if (duplicate) return res.sendStatus(409); //Conflict 
    
        try {
            //encrypt the password
            const hashedPwd = await hash(password, 10);
    
            //create and store the new user
            const result = await user.create({
                "username": username,
                "password": hashedPwd,  
                "email": email.toLowerCase()
            });
    
            res.status(201).json({
                result,
                message: 'successfully authenticated',
                loggedIn: 'true'
            });
        } catch (err) {
            res.status(500).json({ 'message': err.message });
        }
}

export default { handleNewUser };
