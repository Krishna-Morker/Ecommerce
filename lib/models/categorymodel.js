const mongoose = require("mongoose");


const categoryschema = new mongoose.Schema({
    CategoryName: {
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

const Category = mongoose.models.Category || mongoose.model("Category", categoryschema);

export default Category;