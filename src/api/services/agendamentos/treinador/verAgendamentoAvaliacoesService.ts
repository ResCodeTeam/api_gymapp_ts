/**
 * @module VerAgendamentoAvaliacoesService
 */
import { checkTreinador, getTreinadorMarca } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

/**
 * Classe responsavel pelo serviço que serve para obter agendamentos de avaliações
 */
export class VerAgendamentoAvaliacoesService {
    async execute(uid: string) {
        const existsUser = await checkTreinador(uid)
        if (!existsUser) {
            return { data: "Treinador Inexistente", status: 500 }
        }

        const marcaTreinador = await getTreinadorMarca(uid)


        const agendamentos = await client.agendamentos_avaliacoes.findMany({
            where: {
                isDeleted: false,
                ginasio: {
                    marca_id: marcaTreinador
                }
            },
            select: {
                data_agendamento: true,
                isAceite: true,
                users: {
                    select: {
                        nome: true,
                    }
                }
            },

        })

        return { data: agendamentos, status: 200 };
    }
}