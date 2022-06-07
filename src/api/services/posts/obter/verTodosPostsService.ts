/**
 * @module VerTodosPostsService
 */

import { checkMobilidadeMarcaUser, checkUserIdExists, getFuncaoId, getGinasioAluno, getMarcaGym, getUserFuncao } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";
class VerTodosPostsService {
    async execute(userId: string) {

        const { mobilidade, id } = await checkMobilidadeMarcaUser(userId);

        const funcTreinador = await getFuncaoId('Treinador')
        const funcAdm = await getFuncaoId('Administrador')
        const userFuncao = await getUserFuncao(userId)

        if (userFuncao != funcTreinador && userFuncao != funcAdm) {
            if (mobilidade) {

                return getPublicacoesMarca(id['marca_id'])

            } else {

                const marcaId = (await getMarcaGym(id['ginasio_id'])).marca_id

                return getPublicacoesGym(id['ginasio_id'], marcaId)
            }
        } else if (userFuncao == funcTreinador) {

            const marcaId = (await client.treinadores_marca.findFirst({
                where: {
                    treinador_uid: userId
                }
            })).marca_id

            if (mobilidade) {
                return getPublicacoesMarca(marcaId)
            } else {
                return getPublicacoesGymTreinador(marcaId)
            }
        } else {
            const marcas = await client.marcas.findMany({ where: { dono_id: userId } });
            let posts = [];
            for (let marca of marcas) {
                if (marca.mobilidade) {
                    posts.push(...(await getPublicacoesMarca(marca.marca_id)).data)
                } else {
                    posts.push(...(await getPublicacoesGymTreinador(marca.marca_id)).data)
                }
            }
            return { data: posts, status: 200 };

        }
    }

}


async function getPublicacoesMarca(marcaId: string) {
    const publicacoes = await client.publicacoes.findMany({
        where: {
            OR: [
                {
                    users: {
                        definicoes_user: {
                            is_privado: false
                        },
                        OR: [
                            //ir buscar posts de alunos da marca
                            {
                                alunos_marca: {
                                    some: {
                                        marca_id: marcaId
                                    }
                                }
                            },
                            //ir buscar posts de treinadores da marca
                            {
                                treinadores_marca: {
                                    some: {
                                        marca_id: marcaId
                                    }
                                }
                            },
                            //ir buscar posts do dono da marca
                            {
                                marcas: {
                                    some: {
                                        marca_id: marcaId
                                    }
                                }
                            }
                        ]
                    }
                },
                //posts dos ginasios da marca
                {
                    ginasio: {
                        marca_id: marcaId
                    }
                }
            ]
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
            }
        },

    })

    return { data: publicacoes, status: 200 };
}


async function getPublicacoesGym(ginasioId: string, marcaId: string) {
    //publicações dos alunos,treinadores e ginasios
    const publicacoes = await client.publicacoes.findMany({
        where: {
            isDeleted: false,
            OR: [
                {
                    users: {
                        definicoes_user: {
                            is_privado: false
                        },
                        OR: [
                            {
                                //ir buscar posts de alunos do ginasio
                                aluno_ginasio: {
                                    some: {
                                        ginasio_id: ginasioId
                                    }
                                }

                            },
                            {
                                //ir buscar posts de treinadores da marca
                                treinadores_marca: {
                                    some: {
                                        marca_id: marcaId
                                    }
                                }
                            },
                            //ir buscar posts do dono da marca
                            {
                                marcas: {
                                    some: {
                                        marca_id: marcaId
                                    }
                                }
                            }
                        ]
                    }
                },
                //posts do ginasio
                {
                    ginasio: {
                        ginasio_id: ginasioId
                    }
                }
            ]
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
            }

        },

    })

    return { data: publicacoes, status: 200 };

}

async function getPublicacoesGymTreinador(marcaId: string) {
    //publicações dos alunos,treinadores e ginasios da marca
    const publicacoes = await client.publicacoes.findMany({
        where: {
            isDeleted: false,
            OR: [{
                users: {
                    definicoes_user: {
                        is_privado: false
                    },
                    OR: [

                        {
                            //ir buscar posts de alunos do ginasio
                            aluno_ginasio: {
                                some: {
                                    ginasio: {
                                        marca_id: marcaId
                                    }
                                }
                            }

                        },
                        {
                            //ir buscar posts de treinadores da marca
                            treinadores_marca: {
                                some: {
                                    marca_id: marcaId
                                }
                            }
                        },
                        //ir buscar posts do dono da marca
                        {
                            marcas: {
                                some: {
                                    marca_id: marcaId
                                }
                            }
                        }
                    ]
                }
            },
            //posts do ginasio
            {
                ginasio: {
                    marcas: {
                        marca_id: marcaId
                    }
                }
            }
            ]
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
            }

        },

    })



    return { data: publicacoes, status: 200 };

}



export { VerTodosPostsService };

