import { NextResponse } from "next/server";
import { deleteProduct } from "../../../lib/actions/product";

export async function POST(req,res){
    try{
       const body=await req.json();
      console.log("hii");
       const response=await deleteProduct(body);
      /// console.log(response,":kll")
       return NextResponse.json(response);
    }
    catch(error){
        console.log("Error in deleting product",error)
        return NextResponse.json("error");
    }
}