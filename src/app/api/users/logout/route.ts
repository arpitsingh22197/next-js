import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export async function POST() {
    try {
        const response = NextResponse.json({
            message: "logout",
            success: true,
        });

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        return response;
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}