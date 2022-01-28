const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
        .select('-__v') 
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
      },

      // get by single thought id
      getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
             // (- symbol stands for no and __v stating to not to choose)
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
      
  // add thought to user
  addThought({ params, body }, res) {
    console.log(params);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          // identifies the user based on the user id
          { _id: params.userId },
          // updates the thought, ref id to the user model
          { $push: { comments: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        console.log(dbUserData);
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // add Reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      // this is linked to thought.js in api routes
      { _id: params.thoughtId },
      // $push adds a reaction to the array
      { $push: { reaction: body } },
      { new: true, runValidators: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

    // remove reation
    removeReaction({ params }, res) {
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        // $pull removes the reaction from the array
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
      )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
},

  // remove thought
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  }
};


module.exports = thoughtController;
