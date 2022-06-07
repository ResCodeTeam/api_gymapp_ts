/**
 * @module VerTodosTreinosDosAlunosService
 */

import { checkPostExists, checkTreinador, checkUserIdExists, getMobilidadeMarca, getTreinadorMarca } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * Classe responsavel pelo serviço que serve para obter todos os terinos dos alunos
 */
export class VerTodosTreinosDosAlunosService {
    async execute(uid: string) {
        const existsTreinador = await checkTreinador(uid)
        if (!existsTreinador) {
            return { data: "Treinador Inexistente", status: 500 }
        }

        const marcaId = await getTreinadorMarca(uid);
        const treinosAlunos = await client.users.findMany({
            where: {
                OR: [
                    {
                        alunos_marca: {
                            some: {
                                marca_id: marcaId
                            }
                        }
                    },
                    {
                        aluno_ginasio: {
                            some: {
                                ginasio: {
                                    marca_id: marcaId
                                }
                            }
                        }
                    }
                ]
            },
            select: {
                uid: true,
                nome: true,
                email: true,
                treinos: true

            },


        })
        const arrayTreinos = [];

        for (let info of treinosAlunos) {
            if (info.treinos.length > 0) {
                arrayTreinos.push(info)
            }
        }

        return { data: arrayTreinos, status: 200 };
    }
}