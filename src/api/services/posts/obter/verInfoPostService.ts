/**
 * @module VerInfoPostService
 */

import { checkPostExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

/**
 * Classe responsavel pelo serviço que serve para obter dados dos posts
 */
export class VerInfoPostService {
    /**
     * Método que permite obter todos os dados de uma publicação
     * @param postId id da publicação
     */
    async execute(postId: string) {
        const existsPost = await checkPostExists(postId);
        if (!existsPost) {
            return { data: "Publicação não existe", status: 500 }
        }

        const post = await client.publicacoes.findFirst({
            where: {
                publicacao_id: postId,
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
                identificacoes_publicacoes: {
                    select: {
                        users: {
                            select: {
                                nome: true,
                                uid: true,
                                imagem_url: true
                            }
                        }
                    }
                },
                comentarios_publicacao: {
                    select: {
                        users: {
                            select: {
                                nome: true,
                                uid: true,
                                imagem_url: true
                            }
                        },
                        comentario: true,
                    }
                }
            },
        })
        return { data: post == null ? {} : post, status: 200 }
    }
}