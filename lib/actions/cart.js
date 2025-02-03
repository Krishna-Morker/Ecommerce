import { connect } from '../mongodb/mongoose';
import User from '../models/usermodel';  
import Product from '../models/productmodel';  
import mongoose from 'mongoose';


export const addtocart = async (req) => {
    await connect();
    try {
        const {id,userid} = (req);
       // console.log(fileurl);
      const user=await User.findOne({_id:userid});
      user.cart.push(id);
      await user.save();
        return "Product is Successfully Added";
    } catch (error) {
        console.log("Error in Adding product to cart", error);
    }
}

export const delletocart = async (req) => {
    await connect();
    try {
        const { id, userid } = req; 
        const user = await User.findOne({ _id: userid });
        user.cart = user.cart.filter((elem) => elem !== id);
        await user.save();
        return "Product is Successfully Deleted";
    } catch (error) {
        console.log("Error in Deleting product from cart", error);
    }
};

export const getproduct = async (req) => {
    await connect();
    try {
        const { user } = req;
      ///  console.log(user);

        // Remove duplicate IDs
        const uniqueCart = [...new Set(user?.cart)];

        // Use Promise.all to resolve all async operations
        const nejw = await Promise.all(
            uniqueCart.map(async (elem) => {
                return await Product.findOne({ _id: elem });
            })
        );

        return nejw;
    } catch (error) {
        console.log("Error in fetching products from cart", error);
        return [];
    }
};

