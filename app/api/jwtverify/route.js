import { NextResponse } from "next/server";
import { jwtverify } from "../../../lib/actions/user";

export async function POST(req,res){
    try{
       const body=await req.json();
    //  console.log(body);
       const response=await jwtverify(body);
    // console.log(response,":kll")
     return NextResponse.json(response);
    }
    catch(error){
        console.log("Error in getting Product",error)
        return NextResponse.json("error");
    }
}
