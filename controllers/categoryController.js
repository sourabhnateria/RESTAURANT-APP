//create category

const categoryModel = require("../models/categoryModel")

const createcategoryController =async(req,res)=>{
    try {
        const {title,imageUrl} = req.body
        //validation
        if(!title){
            return res.status(500).send({
                success:false,
                message:'please provide category title or image'
            })
        }
        const newCategory = new categoryModel({title,imageUrl})
        await newCategory.save()
        res.status(201).send({
            success:true,
            message:'category created',
            newCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in create category api',
            error
        })
    }
}

const getcategoryController =async(req,res)=>{
    try {
        const categories = await categoryModel.find({})
        if(!categories){
            return res.status(404).send({
                success:false,
                message:'no category found'
            })
        }
        res.status(200).send({
            success:true,
            totalcat: categories.length,
            categories
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in get category api'
        })
    }
}

//update categories
const updatecategoryController =async(req,res)=>{
    try {
        const{id}=req.params
        const {title, imageUrl}=req.body
        const updatedcategory = await categoryModel.findByIdAndUpdate(id,{title,imageUrl},{new:true})
        if(!updatedcategory){
            return res.status(500).send({
                success:false,
                message:'no category found'
            })
        }
        res.status(200).send({
            success:true,
            message:'category updated successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in update category api ',
            error
        })
    }
}

//delete category
const deletecategoryController =async(req,res)=>{
    try {
        const{id}=req.params    
        if(!id){
            return res.status(500).send({
                success:false,
                message:'please provide category id'
            })
        }
        const category = await categoryModel.findById(id)
        if(!category){
            return res.status(500).send({
                success:false,
                message:'no category found with this id'
            })
        }
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:'category deleted successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in delete category api',
            error
        })
    }
}
module.exports={createcategoryController,getcategoryController,updatecategoryController,deletecategoryController}