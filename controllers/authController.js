const userModels = require("../models/userModels")
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')

//REGISTER
const registerController=async(req,res)=>{
    try {
        const{username, email , password,phone,address,answer} =req.body
        //validation
        if(!username || !email || !password || !address || !phone || !answer){
            return res.status(500).send({
                success:false,
                message:'please provide all fields'
            })
        }

        //check user
        const existing = await userModels.findOne({email})
        if(existing){
            return res.status(500).send({
                success:false,
                message:'email already registered please login'
            })
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt)

    
        // create new user
        const user = await userModels.create({username, email, password:hashedPassword,address,phone,answer})
        res.status(500).send({
            success:true,
            message:'successfully registered'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in register API',
            error
        })
    }
}

//login
const loginController =async (req,res)=>{
    try {
        const {email,password} = req.body
        //validation
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message:'please provide email or password'
            })
        }
        //check user
        const user = await userModels.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'user not found'
            })
        }
        //check user password | compare password
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:"invalid credentials",
            })
        }
        //token
        const token = JWT.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        user.password = undefined;
        res.status(200).send({
            success:true,
            message:"login successfully",
            token,
            user
        })
    } catch (error) {
        console.log(error)
        req.status(500).send({
            success:false,
            message:'error in login api',
            error
        })
        
    }
};

module.exports = {registerController, loginController};