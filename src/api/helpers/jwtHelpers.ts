import { sign } from 'jsonwebtoken'
import dotenv from "dotenv"

export async function generateRefreshToken(userId: string) {
    const token = sign({},
        process.env.SECRET_KEY_REFRESH_TOKEN, {
        subject: userId,
        expiresIn: "1y"
    }
    )
    return token
}
export async function generateSessionToken(userId: string) {
    const token = sign({},
        process.env.SECRET_KEY_TOKEN, {
        subject: userId,
        expiresIn: "15m"
    }
    )
    return token
}
