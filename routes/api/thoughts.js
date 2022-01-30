const router = require('express').Router();
const { 
    getAllThoughts,
    getThoughtById,
    addThought,
    removeThought,
    updateThought,
    addReaction,
    removeReaction

  } = require('../../controllers/thought-controller');
  
  // /api/thoughts
  router.route('/').get(getAllThoughts).post(addThought);

  // /api/thoughts/<thoughtId>
  router.route('/:id').get(getThoughtById)

   // /api/thoughts/<userId>/<thoughtId>
   router.route('/:thoughtId').put(updateThought).delete(removeThought);
  
  // /api/thoughts/<userId>/<thoughtId>
  router.route('/:thoughtId/reaction').post(addReaction);

  // /api/thoughts/<userId>/<thoughtId>/<reactionId>
  router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);
  
  module.exports = router;