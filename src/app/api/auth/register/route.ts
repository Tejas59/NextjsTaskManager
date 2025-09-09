import { NextResponse } from "next/server";
import { userRegistrationController } from "../../../../controllers/authController";
import connectDB from "@/libs/db";

export async function POST(request: Request) {
    await connectDB();
    const body = await request.json();
    const result = await userRegistrationController(body);

    if (result.success && result.token) {
        const response = NextResponse.json(result);
        response.cookies.set("token", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60,
        });
        return response;
    }

    return NextResponse.json(result, { status: 400 });
}