import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbconfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = getDataFromToken(request); // this will throw if token is invalid

    const user = await User.findById(userId).select("-password");

    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Authentication failed"},
      { status: 401 }
    );
  }
}
