/**
 * @module VerTreinosAlunosService
 */
import { client } from "../../prisma/client";
import { checkUserIdExists } from "../../helpers/dbHelpers";

/**
 * Classe responsavel pelo serviço que serve para obter os treinos de um aluno
 */
export class VerTreinosAlunosService {
    async execute(uId: string) {

        const exists_user = await checkUserIdExists(uId);
        if (!exists_user) {
            return { data: "O utilizador não existe", status: 500 }
        }

        const treinos = await client.treinos.findMany({
            where: {
                uid: uId,
                isDeleted: false
            },
        })

        return { data: treinos, status: 200 };
    }
}