/**
 * @module VerAgendamentosAvaliacoesAlunoService
 */
import { client } from "../../../prisma/client";
import { checkUserIdExists } from "../../../helpers/dbHelpers";

/**
 * Classe responsavel pelo serviço que serve para obter os pedidos de agendamento de avalições de um aluno
 */
export class VerAgendamentosAvaliacoesAlunoService {
    async execute(uId: string) {

        const exists_user = await checkUserIdExists(uId);
        if (!exists_user) {
            return { data: "O utilizador não existe", status: 500 }
        }

        const agendamentos = await client.agendamentos_avaliacoes.findMany({
            where: {
                uid: uId,
                isDeleted: false
            },
        })

        return { data: agendamentos, status: 200 };
    }
}