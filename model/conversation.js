import { Schema, model } from 'mongoose';

const conversationSchema = Schema(
    {
        members: {
          type: Array,
        },
    },
    { timestamps: true }
)

export default model('conversation', conversationSchema);