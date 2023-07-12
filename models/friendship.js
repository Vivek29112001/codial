const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema
(
    {
        // the user who send this request
        from_user:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        // the user who accepted this , the naming is just to understand otherwise, the users wan't see a difference
        to_user:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

const Friendship = mongoose.model('Friendship', friendshipSchema);
module.exports = Friendship;