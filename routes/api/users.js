const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
  } = require('../../controllers/user-controller');
  
  // /api/users
  router
    .route('/')
    .get(getAllUser)
    .post(createUser);
  
  // /api/users/:id
  router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);
  
    
    //  /api/users/:userId/friends
    router
    .route('/:userId/friends/:friendId')
    .put(addFriend)
    .delete(deleteFriend);
  
    
    
  module.exports = router;

  // BONUS: Remove a user's associated thoughts when deleted. 
  // Challenge yourself here... 