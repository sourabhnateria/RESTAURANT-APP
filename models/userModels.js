const mongoose = require('mongoose')

//schema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'user name is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{type:String,required:[true , 'password is required']},
    address:{type:Array,},
    phone:{type:String, required:[true,'phone number is required']},
    usertype:{type:String, required:[true,'user type is required'],default:'client',enum:['client','admin','vendor','driver']},
    profile:{type:String,default:'https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'},
    answer:{type:String,required:[true,'answer is required']}
}, {timestamps:true})

//export
module.exports =mongoose.model('user',userSchema);