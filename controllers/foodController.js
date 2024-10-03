const foodModels = require("../models/foodModels");
const orderModels = require("../models/orderModels");


const createfoodController =async(req,res)=>{
    try {
        const {title,description,price,imageUrl,fooTags,category,code,isAvailable,restaurant,rating}=req.body;
        if(!title || !description ||!price || !restaurant){
            return res.status(500).send({
                success:false,
                message:'please provide all fields'
            })
        }
        const newFood = new foodModels({title,description,price,imageUrl,fooTags,category,code,isAvailable,restaurant,rating});
        await newFood.save()
        res.status(201).send({
            success:true,
            message:'new food item created',
            newFood
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in create food api',
            error
        })
    }
}

const getfoodController =async(req,res)=>{
    try {
        const foods = await foodModels.find({});
        if (!foods){
            return res.status(404).send({
                success:false,
                totalFoods:foods.length,
                foods
            })
        }
        res.status(200).send({
            success:true,
            totalFoods:foods.length,
            foods
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in get food api',
            error
        })
    }
}

const getfoodbyidController=async(req,res)=>{
    try {
        const foodId= req.params.id
        if (!foodId){
            return res.status(404).send({
                success:false,
                message:'please provide id'
            })
        }
        const food = await foodModels.findById(foodId)
        if(!food){
            return res.status(404).send({
                success:false,
                message:'no food found with this id'
            })
        }
        res.status(200).send({
            success:true,
            food
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in geting food by id api',
            error
        })
    }
}

const getfoodbyresController=async(req,res)=>{
    try {
        const resId= req.params.id
        if (!resId){
            return res.status(404).send({
                success:false,
                message:'please provide restaurant id'
            })
        }
        const food = await foodModels.find({restaurant:resId})
        if(!food){
            return res.status(404).send({
                success:false,
                message:'no food found with this id'
            })
        }
        res.status(200).send({
            success:true,
            message:'food based on restaurant',
            food
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in geting food by id api',
            error
        })
    }
}

const updatefoodController= async(req,res)=>{
    try {
        const foodId = req.params.id
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:'no food id was found'
            })
        }
        const food= await foodModels.findById(foodId)
        if(!food){
            return res.status(404).send({
                success:false,
                message:'no food found'
            })
        }
        const {title,description,price,imageUrl,fooTags,category,code,isAvailable,restaurant,rating} = req.body;
        const updatedFood= await foodModels.findByIdAndUpdate(foodId,{title,description,price,imageUrl,fooTags,category,code,isAvailable,restaurant,rating},{new:true})
        res.status(200).send({
            success:true,
            message:'food item was updated'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in update food api',
            error
        })
    }
}

const deletefoodController=async(req,res)=>{
    try {
          const foodId = req.params.id
          if(!foodId){
            return res.status(404).send({
                success:false,
                message:'provide food id'
            })
          }
          const food = await foodModels.findById(foodId)
          if (!food){
            return res.status(404).send({
                success:false,
                message:'no food found with id'
            })
          }
          await foodModels.findByIdAndDelete(foodId)
          res.status(200).send({
            success:true,
            message:'food item deleted'
          })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in delete food api',
            error
        })
    }
}

const orderfoodController = async(req,res)=>{
    try {
        const {cart}=req.body
        if(!cart){
            return res.status(500).send({
                success:false,
                message:'please add cart or payment method'
            })
        }
        let total = 0
        //cal of price
        cart.map((i)=>{total += i.price})

        const newOrder = new orderModels({
            foods:cart,
            payment:total,
            buyer:req.body.id
        })
        await newOrder.save();
        res.status(201).send({
            success:true,
            message:'order placed successfully',
            newOrder
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in order food api',
            error
        })
    }
}

// change order status
const orderstatusController=async (req,res)=>{
    try {
        const orderid =  req.params.id
        if(!orderid){
            return res.status(404).send({
                success:false,
                message:'please provide valid order id'
            })
        }
        const {status} = req.body
        const order = await orderModels.findByIdAndUpdate(orderid,{status},{new:true})
        res.status(200).send({
            success:true,
            message:'order status updated'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in order status api',
            error
        })
    }
}
module.exports={createfoodController , getfoodController,getfoodbyidController,getfoodbyresController,updatefoodController,deletefoodController,orderfoodController,orderstatusController}