const express = require('express');
const { getuserController, updateUserController, updatepasswordController, resetpasswordController, deleteuserController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//routes
//GET USER || use
router.use('/getuser',authMiddleware,getuserController);

//UPDATE PROFILE
router.put('/updateuser ', authMiddleware, updateUserController);

//update password
router.post('/updatepassword',authMiddleware,updatepasswordController);

//RESET PASSWORD
router.post('/resetpassword',authMiddleware,resetpasswordController)

//DELETE USER
router.delete('/deleteuser/:id',authMiddleware,deleteuserController);

module.exports = router;