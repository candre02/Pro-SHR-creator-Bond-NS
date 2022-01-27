const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reationId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'blah',
            maxlength: 280 
        },
        username: {
            type: String,
            required: 'Username is Required'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);


const ThoughtSchema = new Schema(
    {
        
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1        
    },

        createdAt: {
            type: Date,
            default: Date.now, // Set default value to the current timestamp
            get: (createdAtVal) => dateFormart(createdAtVal) // Use a getter method to format the timestamp on query
    },

        username: { // The username that created this thought
            type: String,
            trim: true,
            required: 'Username that created this thought is Required' 
    },
         // these are like replies
        // Array of nested documents created with the `reactionSchema`
        reactions: [ReactionSchema]
},
{
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);
   
    
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.replies.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;