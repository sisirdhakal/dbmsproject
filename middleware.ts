import {  NextResponse } from "next/server"

export const middleware = async (req) => {

    if (req.nextUrl.pathname.startsWith('/dashboard')) {
        const token = req.cookies.get('token')?.value

        if (token) {

            return NextResponse.next();

        }
        const loginUrl = new URL("/", req.nextUrl)
        return NextResponse.redirect(loginUrl)
    }
}

