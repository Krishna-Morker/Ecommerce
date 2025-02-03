import { connect } from '../mongodb/mongoose';
import Product from '../models/productmodel';  
import mongoose from 'mongoose';


export const getProduct = async (req) => {
    await connect();
    try {
       const {id}=req;
        const newCategory = await Product.find({Categoryid:id});
        return newCategory;
    } catch (error) {
        console.log("Error in creating category", error);
    }
}

export const addproduct = async (req) => {
    await connect();
    try {
       const { productName,description,categoryid,fileURL,Price}=req;
        const newproduct = await Product.create({
            Categoryid:categoryid,
            price:Price,
            ProductName:productName,
            Description:description,
            pictureurl:fileURL,
        });
        await newproduct.save();
        return "Product is Successfully Created";
    } catch (error) {
        console.log("Error in creating product", error);
    }
}
export const deleteProduct = async (req) => {
    await connect();
    try {
        const { id } = req; // or req.params, depending on where the id is coming from
        console.log(":hii")
        if (!id) {
            return "Product ID is required";
        }
       
        const deletedProduct = await Product.findOneAndDelete({ _id: id });
        
        if (!deletedProduct) {
            return "Product not found";
        }
        
        return "Product is successfully deleted";
    } catch (error) {
        console.log("Error in deleting product:", error);
        return "Error in deleting product";
    }
};

export const getProductbyid = async (req) => {
    await connect();
    try {
       const {id}=req;
        const newCategory = await Product.findOne({_id:id});
        return newCategory;
    } catch (error) {
        console.log("Error in creating category", error);
    }
}
