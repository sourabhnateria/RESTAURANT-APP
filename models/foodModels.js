const mongoose = require('mongoose')

//schema
const foodSchema = new mongoose.Schema({
    title:{type:String,required:[true,'food title is required']},
    description:{type:String, required:[true,'food description is required']},
    price:{type:Number , required:[true,'food price is required']},
    imageUrl:{type:String , default:'https://cdn.magicdecor.in/com/2023/11/15105952/Fast-Food-Wallpaper-Design-For-Restaurants-and-Hotels.jpg'},
    foodTags:{type:String},
    category:{type:String },
    code:{type:String},
    isAvailable:{type:Boolean,default:true},
    restaurant:{type:mongoose.Schema.Types.ObjectId, ref:'restaurant'},
    rating:{type:Number, default:5 , min:1, max:5},
    ratingCount:{type:String}

    },
    {timestamps:true}
);

//export
module.exports =mongoose.model('foods',foodSchema);