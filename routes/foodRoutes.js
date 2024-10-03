const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createfoodController, getfoodController, getfoodbyidController, getfoodbyresController, updatefoodController, deletefoodController, orderfoodController, orderstatusController } = require('../controllers/foodController');
const adminMiddleware = require('../middlewares/adminMiddleware');


const router = express.Router();

//CREATE FOOD
router.post('/create',authMiddleware, createfoodController);

//GET FOOD
router.get('/get',getfoodController)

//GET FOOD BY ID
router.get('/get/:id',getfoodbyidController)

//GET FOOD BY RESTAURANT
router.get('/getbyrestaurant/:id',getfoodbyresController)

// UPDATE FOOD 
router.put('/update/:id',authMiddleware,updatefoodController)

// DELETE FOOD
router.delete('/delete/:id',authMiddleware,deletefoodController)

//PLACE ORDER
router.post('/order',authMiddleware,orderfoodController)

// ORDER STATUS
router.post('/orderstatus/:id',adminMiddleware,authMiddleware,orderstatusController)
module.exports = router;