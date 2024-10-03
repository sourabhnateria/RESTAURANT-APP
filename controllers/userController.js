const userModels = require("../models/userModels");
const bcrypt= require("bcryptjs");

// GET USER INFO
const getuserController=async (req,res)=>{
   try {
    //find user
    const user = await userModels.findById({_id:req.body.id})
    //validation
    if(!user){
        return res.status(404).send({
            success:false,
            message:'user not found'
        })
    }
    //hide password
    user.password=undefined
    //response
    res.status(200).send({
        success:true,
        message:'user get successfully',
        user
    })
   } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'error in get user api',
        error
    })    
   }
};

//UPDATE USER
const updateUserController =async (req,res) => {
    try {//find user
        const user = await userModels.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'user not found'
            })
        }
        //update
        const {username,phone,address}= req.body
        if (username) user.username = username
        if (address) user.address= address
        if (phone) user.phone= phone
        //SAVE USER
        await user.save();
        res.status(200).send({
            success:true,
            message:'user update successfully'
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'error in update user api',
            error
        })
    }
};

//UPDATE USER PASSWORD
const updatepasswordController =async(req,res)=>{
    try {
        //find user
        const user = await userModels.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'user not found'
            })
        }
        //get data from user
        const  {oldpassword , newpassword} = req.body
        if(!oldpassword || !newpassword){
            return res.status(500).send({
                success:false,
                message:'pls provide old or new password'
            })
        }
        //check user password | compare password
        const isMatch = await bcrypt.compare(oldpassword,user.password)
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:"invalid old password",
            })
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newpassword, salt)
        user.password=hashedPassword
        await user.save()
        res.status(200).send({
            success:true,
            message:'password update successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in password update api',
            error
        })
    }
}

//RESET PASSWORD
const resetpasswordController=async(req,res)=>{
    try {
        const {email,newpassword,answer}=req.body
        if(!email || !newpassword || !answer){
            return res.status(500).send({
                success:false,
                message:'please provide all fields'
            })
        }
        const user = await userModels.findOne({email,answer})
        if (!user){
            return res.status(500).send({
                success:false,
                message:'user not found or invalid answer'
            })
        }
         //hashing password
         var salt = bcrypt.genSaltSync(10);
         const hashedPassword = await bcrypt.hash(newpassword, salt);
         user.password = hashedPassword
         await user.save()
         res.status(200).send({
            success:true,
            message:'password reset successfully'
         })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in password reset api',
            error
        })
    }
}

//DELETE USER
const deleteuserController = async(req,res)=>{
    try {
        await userModels.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success:true,
            message:'your account has been deleted'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in delete usre api',
            error
        })
    }
}
module.exports= {getuserController , updateUserController,updatepasswordController,resetpasswordController,deleteuserController};