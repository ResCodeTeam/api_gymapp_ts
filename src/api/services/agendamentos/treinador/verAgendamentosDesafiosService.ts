/**
 * @module VerAgendamentosDesafiosService
 */
import { checkTreinador, getTreinadorMarca } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

/**
 * Classe responsavel pelo serviço que serve para obter agendamentos de desafios
 */
export class VerAgendamentosDesafiosService {
    /**
 * Método que permite obeter os pedidos de agendamento de desafio da base de dados tendo em conta todas as verificações necessárias
 * 
 * @param uid id do utilizador
 */
    async execute(uid: string) {

        const existsUser = await checkTreinador(uid)
        if (!existsUser) {
            return { data: "Treinador Inexistente", status: 500 }
        }

        const marcaTreinador = await getTreinadorMarca(uid)


        const agendamentos = await client.agendamentos_desafios.findMany({
            where: {
                isDeleted: false,
                ginasio: {
                    marca_id: marcaTreinador
                }
            },
            include: {
                desafios: {
                    include: {
                        modalidades_ginasio: {
                            select: {
                                nome: true
                            }
                        }
                    }
                },
                users: {
                    select: {
                        nome: true,
                    }
                },
            }
        })

        return { data: agendamentos, status: 200 };
    }
}