import { NextResponse } from "next/server";
import { storeuser } from "../../../lib/actions/user";

export async function POST(req,res){
    try{
       const body=await req.json();
     //  console.log(body);
       const response=await storeuser(body);
   
       return NextResponse.json(response);
    }
    catch(error){
        console.log("Error in siging-up user",error)
        return NextResponse.json("error");
    }
}
