const User = require('../model/user');
const server = require('../model/server')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const cookies = req.cookies;

    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'email and password are required.' });

    const user = await User.findOne({ email }).exec();
    
    // const dbserver = await server.findOne({user: user._id}).exec();
    
    if (!user) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(password, user.password);
    if (match) {
        // const roles = Object.values(user.roles).filter(Boolean); 
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": user.username,
                    email
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );
        // const refreshToken = jwt.sign(
        //     { "username": user.username },
        //     process.env.REFRESH_TOKEN_SECRET,
        //     { expiresIn: '10s' }
        // );

        const newRefreshToken = jwt.sign(
            { "username": user.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // Changed to let keyword
        let newRefreshTokenArray =
            !cookies?.jwt
                ? user.refreshToken
                : user.refreshToken.filter(rt => rt !== cookies.jwt);

        if (cookies?.jwt) {

            /* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
            const refreshToken = cookies.jwt;
            const foundToken = await User.findOne({ refreshToken }).exec();

            // Detected refresh token reuse!
            if (!foundToken) {
                // clear out ALL previous refresh tokens
                newRefreshTokenArray = [];
            }

            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        }

        user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        const result = await user.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.setHeader('Content-Type', 'application/json');
        res.json({ 
            user, 
            accessToken, 
            message: 'successfully authenticated', 
            loggedIn: true 
        });

    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };
