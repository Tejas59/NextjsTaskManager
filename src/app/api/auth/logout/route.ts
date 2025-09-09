import { NextResponse } from "next/server";
import { userLogoutController } from "../../../controllers/authController";
import connectDB from "@/libs/db";

export async function GET() {
    await connectDB();
    const result = await userLogoutController();
    const response = NextResponse.json(result);
    response.cookies.set("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 0,
    });
    return response;
}
