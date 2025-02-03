import { NextResponse } from "next/server";
import { logout } from "../../../lib/actions/user";

export async function GET(req,res){
    try{
     //  console.log(body);
       const response=await logout();
   
       return NextResponse.json(response);
    }
    catch(error){
        console.log("Error in getting Product",error)
        return NextResponse.json("error");
    }
}
