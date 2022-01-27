const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
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
  
    
    //  /api/users/:userId/friends/:friendsId
    router
    .post(createFriend) 
    .delete(deleteFriends);  
    
    
  module.exports = router;

  // BONUS: Remove a user's associated thoughts when deleted. 
  // Challenge yourself here... (location 22-23)