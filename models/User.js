const { Schema, model } = require('mongoose');
const { Thought } = require('.');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: 'Username is Required'
    },

    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+@.+\..+/]  
        // for line 14 Must match a valid email address (look into Mongoose's matching validation)
    },

    thoughts: [
        { 
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }
    ] 

,

    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
} 
);

// get total count of friends and replies on retrieval the length of the users friends array field on query.
UserSchema.virtual('friendCount').get(function() {
    return this.thoughts.reduce(
        (total, thought) => total + thought.replies.length + 1, 0
    );    
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the user model
module.exports = User;