const mongoose = require('mongoose')

//schema
const restaurantSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'restaurant title is required']
    },
    imageUrl:{
        type:String,
        default:'https://w7.pngwing.com/pngs/507/64/png-transparent-dashboard-default-home-house-main-page-outline-style-icon.png'
    },
    foods:{type:Array},
    time:{
        type:String
    },
    pickup:{
        type:Boolean,
        default:true
    },
    delivery:{
        type:Boolean,
        default:true
    },
    isOpen:{
        type:Boolean,
        default:true
    },
    logoUrl:{
        type:String,
        default: 'https://image.similarpng.com/very-thumbnail/2021/07/Chef-restaurant-logo-illustrations-template-on-transparent-background-PNG.png'
    },
    rating:{
        type:Number,
        default:1,
        min:1,
        max:5
    },
    ratingCount:{
        type:String
    },
    code:{
        type:String
    },
    coords:{
        id:{type:String},
        latitude:{type:Number},
        latitudeDelta:{type:Number},
        longitude:{type:Number},
        longitudeDelta:{type:Number},
        address:{type:String},
        title:{type:String}
    }
},
    {timestamps:true}
);

//export
module.exports =mongoose.model('restaurant',restaurantSchema);