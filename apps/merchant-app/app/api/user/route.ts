import { NextResponse } from "next/server"


export const GET = async () => {
    return NextResponse.json({
        message: "Hii, From merchant-app:api/user/"
    })
}