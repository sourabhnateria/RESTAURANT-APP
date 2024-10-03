const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createrestaurantController, getrestaurantController, getrestaurantidController, deleterestaurantController } = require('../controllers/restaurantController');

const router = express.Router();

//routes
// CREATE RESTAURANT || POST
router.post('/create',authMiddleware,createrestaurantController);

// GET  RESTAURANT || GET
router.get('/get',getrestaurantController);

// GET RESTAURANT BY ID || GET
router.get('/getbyid/:id',getrestaurantidController);

// DELETE RESTAURANT || DELETE
router.delete('/delete/:id',authMiddleware,deleterestaurantController)

module.exports = router;