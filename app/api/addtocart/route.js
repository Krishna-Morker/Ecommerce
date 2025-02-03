import { NextResponse } from "next/server";
import { addtocart } from "../../../lib/actions/cart";

export async function POST(req,res){
    try{
       const body=await req.json();
       //console.log(body);
       const response=await addtocart(body);
    //   console.log(response,":kll")
       return NextResponse.json(response);
    }
    catch(error){
        console.log("Error in deleting category",error)
        return NextResponse.json("error");
    }
}