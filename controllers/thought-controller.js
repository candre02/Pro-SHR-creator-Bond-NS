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

      // get a single thought by its id
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
      
  // create a new thought
  addThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          // identifies the user based on the user id
          { _id: body.userId },
          // updates the thought, ref id to the user model
          { $push: { thoughts: _id } },
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

  // add a reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
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

    // remove a reaction by the reaction's id value
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

// Put (update) thought by its id 
updateThought({ params, body }, res) {
  console.log("Update", body ); 
    Thought.findOneAndUpdate(
      { _id: params.thoughtId }, {$set: body},
      { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404)
            .json({ message: `No thought found with id: ${params.thoughtId}` });
          return;
        }
        console.log(dbThoughtData);
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // delete a thought by its id
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
