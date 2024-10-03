const userModels = require('../models/userModels')

module.exports= async(req, res, next) => {
    try {
        const user  = await userModels.findById(req.body.id)
        if(user.usertype!=="admin"){
            return res.status(401).send({
                success:false,
                message:'only admin access'
            })
        }else{
            next();
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'un-Authorized access',
            error
        })
    }
}