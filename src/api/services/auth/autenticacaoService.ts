/**
 * @module AuthService
 */
import { compare } from "bcrypt"
import { generateRefreshToken, generateSessionToken } from "../../helpers/jwtHelpers"
import { client } from "../../prisma/client"

export class AuthService {
    async execute(email: string, password: string) {
        const user = await client.users.findFirst({
            where: {
                email,
                isDeleted: false
            }
        })

        if (user == null) {
            return { data: 'Erro na autenticação!: Password ou Email errados', status: 500 }

        }

        const userId = user.uid
        const passwd = user.password

        const comp = await compare(password, passwd);
        if (!comp) {
            return { data: 'Erro na autenticação!: Password ou Email errados', status: 500 }

        }

        const refreshToken = await generateRefreshToken(userId)
        await client.users.update({
            data: {
                refresh_token: refreshToken
            },
            where: {
                uid: userId,
            }
        })

        const token = await generateSessionToken(userId)

        return {
            data: {
                message: "Login concluido com sucesso",
                token,
                refreshToken
            },
            status: 200
        }
    }
}

