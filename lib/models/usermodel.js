const mongoose = require("mongoose");;
const jwt=require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    default: "$2b$10$M62ybY2nJLxqQM0noVK49O9/eJm/8xIdE5o3pxGHGT1niVsmhj8ay",
    min: 8,
  },
  tokens:[{
    token:{ 
        type:String
    }
}],
admin:{
    type:Boolean,
    default:false,
}
});

  userSchema.methods.generateAuthToken= async function(){
    try {
        const toke= jwt.sign({email:this.email},process.env.NEXT_PUBLIC_Secret_Key);
        this.tokens=this.tokens.concat({token:toke});
        await this.save();

        return toke;
    } catch (error) {
        res.send("the error part"+error);

    }
}
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
