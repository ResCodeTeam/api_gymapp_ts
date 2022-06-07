/**
 * @module LogoutService
 */
import { getUserByID } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * Classe responsavel pelo logout de um utilizador
 */
export class LogoutService {
    /**
     * Método que permite realizar o logout de um utilizador impedindo o token deste de ser reutilizado
     * @param userId id do utilizador
     * @param token token de sessão do utilizador
     * @returns 
     */
    async execute(userId: string, token: string) {
        const user = await getUserByID(userId)
        if (!user) {
            return { data: "User inexistente", status: 500 }
        }

        if (!user.refresh_token) {
            return { data: "Sessão invalida", status: 500 }
        }

        await client.users.update({
            data: {
                refresh_token: null
            },
            where: {
                uid: userId
            }
        })

        await client.black_list.create({
            data: {
                tokenId: token,
                uid: userId,
            }
        })
        return { data: "Logout com sucesso", status: 200 }
    }
}