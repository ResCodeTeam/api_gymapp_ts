/**
 * @module EditarPublicacaoService
 */
import { checkAutorPublicacoes, checkPublicacaoExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * @param uId id do utilizador
 * @param publicacaoId id da publicacao
 * @param newData dados da publicacao
 * @param descricao descricao da publicacao
 */
export interface IPublicacao {
    uId: string,
    publicacaoId: string,
    newData: Date,
    descricao: string
}

export class EditarPublicacaoService {
    async execute({ uId, publicacaoId, newData, descricao }: IPublicacao) {

        if (publicacaoId == null) {
            return { data: "Impossível aceder à publicação.", status: 500 }
        }

        const exists = await checkPublicacaoExists(publicacaoId)
        if (!exists) {
            return { data: "A publicação não existe", status: 500 }
        }

        const isAutor = await checkAutorPublicacoes(uId, publicacaoId)
        if (!isAutor) {
            return { data: "Não possui autorização", status: 500 }
        }

        if (newData == null) {
            return { data: "Campo data não preenchido", status: 500 }
        }

        const verificaData = await client.publicacoes.findUnique({
            where: {
                publicacao_id: publicacaoId,
            },
            select: {
                data: true
            }
        });


        if (verificaData.data > newData) {
            return { data: "Não é possivel alterar! Data inválida", status: 500 }
        }

        if (descricao == null) {
            return { data: "Campo descrição não preenchido", status: 500 }
        }

        const verificaDescricao = await client.publicacoes.findUnique({
            where: {
                publicacao_id: publicacaoId,
            },
            select: {
                descricao: true,
            }
        });

        if (verificaDescricao.descricao == descricao) {
            return { data: "Não é possivel alterar! Descrição é igual", status: 500 }
        }

        const publicação = await client.publicacoes.update({
            where: {
                publicacao_id: publicacaoId
            },
            data: {
                data: newData,
                descricao
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
        return { data: publicação, status: 200 };
    }
}