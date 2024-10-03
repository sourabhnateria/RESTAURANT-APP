const restaurantModel = require("../models/restaurantModel")

//create restaurant
const createrestaurantController =async(req,res)=>{
    try {
        const {title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,coords} = req.body
    //validation
    if(!title || !coords){
        return res.status(500).send({
            success:false,
            message:'please provide title and address'
        })
    }
    const newRestaurant = await restaurantModel({title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,coords})
    await newRestaurant.save()
    res.status(201).send({
        success:true,
        message:'new restaurant created'
    })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in create restaurant api',
            error
        })
    }
}

//get restaurant
const getrestaurantController=async(req,res)=>{
    try {
        const restaurants= await restaurantModel.find({})
        if(!restaurants){
            return res.status(404).send({
                success:false,
                message:'no restaurant available'
            })
        }
        res.status(200).send({
            success:true,
            totalCount:restaurants.length,
            restaurants
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in get restaurant api',
            error
        })
    }
}

//get restaurant by id
const getrestaurantidController =async (req,res)=>{
    try {
        const restaurantid = req.params.id
        if (!restaurantid){
            return res.status(404).send({
                success:false,
                message:'please provide restaurant id'
            })
        }
        //find restuarant
        const restaurant =await restaurantModel.findById(restaurantid)
        if (!restaurant){
            return res.status(404).send({
                success:false,
                message:'no restaurant found'
            })
        }
        res.status(200).send({
            success:true,
            restaurant
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in get restaurant by id api',
            error
        })
    }
}

//delete restaurant

const deleterestaurantController= async (req,res)=>{
    try {
        const restaurantid = req.params.id
        if(!restaurantid){
            return res.status(404).send({
                success:false,
                message:'no restaurant found or provide restaurant id'
            })
        }
        await restaurantModel.findByIdAndDelete(restaurantid);
        res.status(200).send({
            success:true,
            message:'restaurant delete successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in delete restaurant api',
            error
        })
    }
}

module.exports={createrestaurantController,getrestaurantController,getrestaurantidController,deleterestaurantController}