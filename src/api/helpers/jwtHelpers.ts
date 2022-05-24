import { sign } from 'jsonwebtoken'

export async function generateRefreshToken(userId: string) {
    const token = sign({},
        process.env.SECRET_KEY_REFRESH_TOKEN, {
        subject: userId,
        expiresIn: "1y"
    }
    )
    return token
}
export async function generateSessionToken(uid: string) {


    const token = sign({},
        process.env.SECRET_KEY_TOKEN, {
        subject: uid,
        expiresIn: "15m"
    }
    )
    return token
}
