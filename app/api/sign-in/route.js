import { NextResponse } from "next/server";
import { validateuser } from "../../../lib/actions/user";

export async function POST(req,res){
    try{
       const body=await req.json();
    //  console.log(body);
       const response=await validateuser(body);
    //  console.log(response,":kll")
       return NextResponse.json(response);
    }
    catch(error){
        console.log("Error in signning  user",error)
        return NextResponse.json("error");
    }
}
