const mongoose = require("mongoose");


const productschema = new mongoose.Schema({
    Categoryid:{
    type: mongoose.Schema.Types.ObjectId,
      ref:"Category",
      required:true
    },
    price:{
        type: Number,
        required: true,
    },
    ProductName: {
        type: String,
        unique: true,
        required: true,
    },
    Description: {
        type: String,
        unique: true,
        required: true,
    },
    pictureurl: { type: String, required: true }
},{timestamps: true});

const Product = mongoose.models.Product || mongoose.model("Product", productschema);

export default Product;