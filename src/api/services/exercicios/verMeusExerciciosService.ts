/**
 * @module VerMeusExerciciosService
 */
import { client } from "../../prisma/client";

/**
 * @param autorId id do autor dos exercícios
 */
export interface IMeusExercicios {
    autorId: string
}

/**
 * Classe responsavel pelo serviço que serve para obter os exercícios do utilizador
 */
export class VerMeusExerciciosService {
    async execute({ autorId }: IMeusExercicios) {

        const exercicio = await client.exercicios.findMany({
            where: {
                autor_id: autorId,
                isDeleted: false

            }, select: {
                exercicio_id: true,
                nome: true,
                descricao: true,
                is_tempo: true,
                imagens: {
                    select: {
                        url: true
                    }
                },
                musculos: {
                    select: {
                        musculos: {
                            select: {
                                nome: true,
                                img_url: true
                            }
                        }
                    }
                }

            }

        })
        return { data: exercicio, status: 200 };
    }
}