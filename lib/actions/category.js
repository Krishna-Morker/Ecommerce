import { connect } from '../mongodb/mongoose';
import Category from '../models/categorymodel';  
import Product from '../models/productmodel';  
import mongoose from 'mongoose';


export const createCategory = async (req) => {
    await connect();
    try {
        const {categoryName,description,fileURL} = (req);
       // console.log(fileurl);
        const newCategory = await Category.create({
            CategoryName:categoryName,
            Description:description,
            pictureurl:fileURL,
        });
        //`f console.log(newCategory);
        await newCategory.save();

        return "Category is Successfully Created";
    } catch (error) {
        console.log("Error in creating category", error);
    }
}
export const getCategory = async (req) => {
    await connect();
    try {
       // console.log(fileurl);
        const newCategory = await Category.find();
        return newCategory;
    } catch (error) {
        console.log("Error in creating category", error);
    }
}
export const deleteCategory = async (req) => {
    await connect();
    try {
        const {id} = (req);
        const newCategory = await Category.findOneAndDelete({_id:id});
        const deleteProduct = await Product.deleteMany({Categoryid:id});
        return "Category is Successfully Deleted";
    } catch (error) {
        console.log("Error in deleting category", error);
    }
}

