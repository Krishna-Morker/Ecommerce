import { NextResponse } from "next/server";
import { getproduct } from "../../../lib/actions/cart";

export async function POST(req,res){
    try{
       const body=await req.json();
       const response=await getproduct(body);
      /// console.log(response,":kll")
       return NextResponse.json(response);
    }
    catch(error){
        console.log("Error in deleting product",error)
        return NextResponse.json("error");
    }
}