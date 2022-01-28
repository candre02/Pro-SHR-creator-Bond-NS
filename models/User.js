const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+@.+\..+/]  
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal) 
    },

    thoughts: [
        { 
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }
    ],

    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},
{
    toJSON: {
        // communicating to mongoose we have virtuals and getters
        virtuals: true,
        getters: true
    },
    id: false
} 
);

// get total count of friends and replies on retrieval the length of the users friends array field on query.
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the user model
module.exports = User;