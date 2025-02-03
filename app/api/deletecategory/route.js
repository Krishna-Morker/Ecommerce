import { NextResponse } from "next/server";
import { deleteCategory } from "../../../lib/actions/category";

export async function POST(req,res){
    try{
       const body=await req.json();
       //console.log(body);
       const response=await deleteCategory(body);
    //   console.log(response,":kll")
       return NextResponse.json(response);
    }
    catch(error){
        console.log("Error in deleting category",error)
        return NextResponse.json("error");
    }
}