import user from '../model/user.js';

export async function handleLogout(req, res) {
    // On client, also delete the accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt)
        return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await user.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshToken = [];
    const result = await foundUser.save();
    console.log('logout.js :', result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

