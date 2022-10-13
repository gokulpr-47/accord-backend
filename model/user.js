import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        default: null
    },
    email: {
        index: true,
        unique: true,
        type: String,
    },
    password: {
        type: String
    },
    refreshToken: [String]
})

export default model("user", userSchema);