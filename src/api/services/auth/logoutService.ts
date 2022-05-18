import { getUserByID } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

export class LogoutService {
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