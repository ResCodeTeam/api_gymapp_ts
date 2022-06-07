/**
 * @module VerAgendamentosDesafiosAlunoService
 */
import { client } from "../../../prisma/client";
import { checkUserIdExists } from "../../../helpers/dbHelpers";

/**
 * Classe responsavel pelo serviço que serve para obter os pedidos de agendamento de desafios de um aluno
 */
export class VerAgendamentosDesafiosAlunoService {
     /**
 * Método que permite obter os pedidos de agendamentos de desafios da base de dados tendo em conta todas as verificações necessárias
 * 
 * @param uId id do utilizador
 */
    async execute(uId: string) {

        const exists_user = await checkUserIdExists(uId);
        if (!exists_user) {
            return { data: "O utilizador não existe", status: 500 }
        }

        const agendamentos = await client.agendamentos_desafios.findMany({
            where: {
                uid: uId,
                isDeleted: false
            },
        })

        return { data: agendamentos, status: 200 };
    }
}