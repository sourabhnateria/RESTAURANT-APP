const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createcategoryController, getcategoryController, updatecategoryController, deletecategoryController } = require('../controllers/categoryController');


const router = express.Router();

//routes
// CREATE CATEGORY
router.post('/create',authMiddleware,createcategoryController)

//GET CATEGORY
router.get('/get',getcategoryController)

//UPDATE CAT
router.put('/update/:id',authMiddleware,updatecategoryController)

//DELETE CATEGORY
router.delete('/delete/:id',authMiddleware,deletecategoryController)

module.exports = router;