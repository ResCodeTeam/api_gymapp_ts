/**
 * @module VerTodosPostsUserService
 */

import { getUserByID } from "../../../helpers/dbHelpers"
import { client } from "../../../prisma/client"

/**
 * Classe responsavel pelo serviço que serve para obter todos os posts de um utilizador
 */
export class VerTodosPostsUserService {
    /**
     * Método que pemrite obter todos os posts de um utilizador
     * @param userId id do utilizador
     */
    async execute(userId: string) {
        if (!userId) {
            return { data: "Utilizador não existe", status: 500 }
        }

        const existsUser = await getUserByID(userId)
        if (!existsUser) {
            return { data: "Utilizador não existe", status: 500 }
        }

        const posts = await client.publicacoes.findMany({
            where: {
                criador_id: userId,
                isDeleted: false,
                users: {
                    definicoes_user: {
                        is_privado: false
                    }
                }
            },
            select: {
                publicacao_id: true,
                criador_id: true,
                ginasio_id: true,
                data: true,
                descricao: true,
                tipo: true,
                imagens_publicacao: {
                    select: {
                        url: true
                    }
                },
                _count: {
                    select: {
                        gostos_publicacao: true
                    }
                },
                gostos_publicacao: {
                    select: {
                        users: {
                            select: {
                                nome: true,
                                uid: true,
                                imagem_url: true
                            }
                        },
                    }
                },
            },
        })
        return { data: posts, status: 200 };
    }
}