import { connect } from '../mongodb/mongoose';
import User from '../models/usermodel'; 
import { cookies } from 'next/headers' 
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';


export const validateuser = async (req) => {
    const cookieStore = await cookies();
    await connect();
    try {
       const {email,password}=req;
       const user = await User.findOne({ email });
       if (!user)
       return ({ msg: "Incorrect Username or Password", status: false });

       const isPasswordValid = await bcrypt.compare(password, user.password);
       if (!isPasswordValid)
         return ({ msg: "Incorrect Username or Password", status: false });
       delete user.password;
console.log(email,password)
    const token = await user.generateAuthToken();
    cookieStore.set({
        name: 'jwt',
        value: token,
        httpOnly: true,
        path: '/',
      })
      return ({ status: true, user });
    } catch (error) {
        console.log("Error in sign-in user", error);
    }
}

export const storeuser=async(req)=>{
    await connect();
    const cookieStore = await cookies();
    try {
        const { email, password } = req;
        
        const emailCheck = await User.findOne({ email });
       // console.log(emailCheck,password);
        if (emailCheck)
          return ({ msg: "Email already used", status: false });
       //   console.log(email,password);
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(email,password);
        const user = await User.create({
          email,
          password: hashedPassword,
        });
     ///   console.log(user);
        await user.save();
      
        delete user.password;
        const token = await user.generateAuthToken();
       /// console.log(token);
       cookieStore.set({
        name: 'jwt',
        value: token,
        httpOnly: true,
        path: '/',
      })
        
       ///  console.log(token);
        return ({ status: true, user });
      } catch (ex) {
        return ({ msg: "Error in sign-up", status: false });
      }
}

export const jwtverify = async (req) => {
    const cookieStore = await cookies();
    await connect();
    try {
        const token=cookieStore.get('jwt')?.value;
     ///   console.log(token);
        let islog=0;
        if(token){
        const verifyuser= jwt.verify(token,process.env.NEXT_PUBLIC_Secret_Key);
        const user= await User.findOne({email:verifyuser.email});
        user.tokens.map((e)=>{
          if(e.token==token) islog=1;
        });
        req.user=user;
        return ({sta:islog,user:req.user})
        }
        return ({sta:0,user:null})
    } catch (error) {
        console.log("Error in sign-in user", error);
    }
}

export const logout = async (req) => {
    const cookieStore = await cookies();
    await connect();
    try {
        const token=cookieStore.get('jwt')?.value;
        (await cookies()).delete('jwt')
        const verifyuser= jwt.verify(token,process.env.NEXT_PUBLIC_Secret_Key);
        const user= await User.findOne({email:verifyuser.email});
    
        user.tokens=user?.tokens?.filter((elem)=>{
                   elem.token !== token;
              })
        await user.save()
        return ({ msg: "User logged out successfully", status: true });
      } catch (ex) {
        return "Error in log-out"
      }
}



