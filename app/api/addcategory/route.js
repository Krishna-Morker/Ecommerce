import { NextResponse } from "next/server";
import { createCategory,getCategory } from "../../../lib/actions/category";

export async function POST(req,res){
    try{
       const body=await req.json();
      // console.log(body);
       const response=await createCategory(body);
      // console.log(response,":kll")
       return NextResponse.json(response);
    }
    catch(error){
        console.log("Error in creating category",error)
        return NextResponse.json("error");
    }
}
export async function GET(req,res){
    try{
      // console.log(body);
       const response=await getCategory();
     
       return NextResponse.json(response);
    }
    catch(error){
        console.log("Error in creating category",error)
        return NextResponse.json("error");
    }
}