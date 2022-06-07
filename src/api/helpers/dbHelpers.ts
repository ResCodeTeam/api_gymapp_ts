/**
 * @module dbHelpers
 */
import { client } from "../prisma/client";
import dayjs from "dayjs";
import "dayjs/locale/pt";
import { Interface } from "readline";

export interface IDayWeek {
    name: string,
    abbreviation: string
}

/**
 * Permite alterar o email de um utilizador
 * 
 * @param email email do utilizador
 * @param uid id do utilizador
 */
let checkChangeEmail = async (email: string, uid: string) => {
    const search = await client.users.findMany({
        where: {
            email,
            uid: {
                not: uid
            }
        }
    })
    return search.length != 0;
}

/**
 * Permite verificar se um email existe
 * @param email email a verificar
 */
let checkEmail = async (email: string) => {
    const search = await client.users.findMany({
        where: {
            email
        }
    })
    return search.length != 0;
}
/**
 * Permite obter as definições de um utilizador
 * 
 * @param uId 
 */
let findUserDefinicoes = async (uId: string) => {
    const search = await client.definicoes_user.findFirst({
        where: {
            usersuid: uId,
            AND: {
                users: {
                    isDeleted: false
                }
            }
        }
    })
    return search.def_id;
}

/**
 * Permite obter o id da função do treinador
 * @returns 
 */
let getTreinadorFuncaoId = async () => {
    const search = await client.funcoes.findFirst({
        where: {
            descricao: "Treinador",
        }
    })
    return search.funcao_id;
}

/**
 * Método que permite verificar se um treinador existe
 * 
 * @param uId id do utilizador
 */
let checkTreinador = async (uId: string) => {
    const search = await client.users.findMany({
        where: {
            uid: uId,
            funcao_id: await getTreinadorFuncaoId(),
            isDeleted: false
        }
    })
    return search.length != 0;
}

/**
 * Método que permite verificar se um desafio existe
 * 
 * @param desafioId id do desafio
 */
let checkDesafioIdExists = async (desafioId: string) => {
    const search = await client.desafios.findMany({
        where: {
            desafio_id: desafioId,
            isDeleted: false,
        }
    })
    return search.length != 0;
}

/**
 * Método que permite verificar se um desafio se encontra disponível
 * 
 * @param desafioId id do desafio
 */
let checkDesafioDisponivel = async (desafioId: string) => {
    const search = await client.desafios.findMany({
        where: {
            desafio_id: desafioId,
            isDeleted: false,
            isEncerrado: false
        }
    })
    return search.length != 0;
}

/**
 * Método que permite verificar se uma avaliação existe
 * 
 * @param avaliacaoId id da avaliação
 * @returns 
 */
let checkAvaliacoesExists = async (avaliacaoId: string) => {
    const search = await client.avaliacoes.findMany({
        where: {
            avaliacao_id: avaliacaoId,
            isDeleted: false
        }
    })
    return search.length != 0;
}

/**
 * Método que permite verificar se o utilizador é o autor da publicação
 * 
 * @param uId id do utilizador
 * @param publicacaoId id da publicação
 */
let checkAutorPublicacoes = async (uId, publicacaoId) => {
    const publicacao = await client.publicacoes.findMany({
        where: {
            criador_id: uId,
            publicacao_id: publicacaoId
        }
    })
    return publicacao.length != 0;
}

/**
 * Método que permite verificar se o utilizador é o autor do gosto
 * 
 * @param uId id do utilizador
 * @param gostoId id do gosto
 */
let checkAutorGosto = async (uId: string, gostoId: string) => {
    const gosto = await client.gostos_publicacao.findMany({
        where: {
            criador_id: uId,
            gosto_id: gostoId
        }
    })
    return gosto.length != 0;
}

/**
 * Método que permite verificar se o utilizador é o dono da marca
 * 
 * @param uId id do utilizador
 * @param marcaId id da marca
 */
let checkAutorMarca = async (uId, marcaId) => {
    const marca = await client.marcas.findMany({
        where: {
            dono_id: uId,
            marca_id: marcaId
        }
    })

    return marca.length != 0
}

/**
 * Método que permite verificar se o utilizador é o dono da submissão do desafio
 * 
 * @param uId id do utilizador
 * @param submissao_id id da submissão do desafio
 */
let checkAutorSubmissaoDesafio = async (uId, submissao_id) => {
    const subDesafio = await client.submissoes_desafios.findMany({
        where: {
            treinador_id: uId,
            submissao_id: submissao_id
        }
    })

    return subDesafio.length != 0
}

/**
 * Método que permite verificar se a submissão do desafio existe
 * 
 * @param submissao_id id da submissão do desafio
 */
let checkSubmissaoExists = async (submissao_id) => {
    const submissao = await client.submissoes_desafios.findMany({
        where: {
            submissao_id: submissao_id
        }
    })

    return submissao.length != 0
}

/**
 * Método que permite verificar se a publicação existe
 * 
 * @param publicacaoId id da publicação
 */
let checkPublicacaoExists = async (publicacaoId) => {
    const publicacao = await client.publicacoes.findMany({
        where: {
            publicacao_id: publicacaoId
        }
    })

    return publicacao.length != 0
}

/**
 * Método que permite verificar se o plano de treino existe
 * 
 * @param planoId id do plano de treino
 */
let checkPlanoTreinoExists = async (planoId: string) => {
    const search = await client.planos_treino.findMany({
        where: {
            plano_treino_id: planoId,
            isDeleted: false
        }
    })
    return search.length != 0;
}

/**
 * Método que permite verificar se o plano de treino se encontra realizado
 * 
 * @param planoId id do plano de treino
 */
let checkPlanoTreinoIsRealizado = async (planoId: string) => {
    const search = await client.planos_treino.findMany({
        where: {
            plano_treino_id: planoId,
            isDeleted: false,
            isRealizado: true
        }
    })
    return search.length != 0;
}

/**
 * Método que permite verificar se o utilizador existe
 * 
 * @param userId id do utilizador
 */
let checkUserIdExists = async (userId: string) => {
    const search = await client.users.findMany({
        where: {
            uid: userId,
            isDeleted: false
        }
    })
    return search.length != 0;
}

/**
 * Método que permite verificar se o utilizador existe na base de dados
 * 
 * @param userId id do utilizador
 */
let checkUserIdIsDeleted = async (userId: string) => {
    const search = await client.users.findMany({
        where: {
            uid: userId,
            isDeleted: false
        }
    })
    return search.length == 0;
}

/**
 * Método que permite obter um utilizador pelo Id
 * 
 * @param userId id da publicação
 */
let getUserByID = async (userId: string) => {

    const user = await client.users.findFirst({
        where: {
            uid: userId,
            isDeleted: false
        }
    })
    return user;
}

/**
 * Método que permite obter o id de uma função através do seu nome
 * 
 * @param nome nome da função
 */
let getFuncaoId = async (nome: string) => {
    const search = await client.funcoes.findFirst({
        where: {
            descricao: nome
        },
        select: {
            funcao_id: true
        }
    });
    if (search == null) {
        return null;
    }
    return search?.funcao_id;
}

/**
 * Método que permite obter a função de um utilizador
 * 
 * @param uid id do utilizador
 */
async function getUserFuncao(uid: string) {

    const search = await client.users.findFirst({
        where: {
            uid,
            isDeleted: false
        },
        select: {
            funcao_id: true
        }
    });

    return search.funcao_id;
}

/**
 * Método que permite obter o ginásio de um desafio
 * 
 * @param desafioId id do desafio
 */
let getGinasioDesafio = async (desafioId: string) => {
    const search = await client.desafios.findUnique({
        where: {
            desafio_id: desafioId
        },
        select: {
            ginasio_id: true
        }
    });

    return search.ginasio_id;
}

/**
 * Método que permite obter o dono da marca
 * 
 * @param marcaId id da marca
 */
let getDonoMarca = async (marcaId: string) => {

    const search = await client.marcas.findUnique({
        where: {
            marca_id: marcaId
        },
        select: {
            dono_id: true
        }
    });

    return search.dono_id;
}

/**
 * Método que permite verificar se um post existe
 * 
 * @param postId id da publicação
 */
let checkPostExists = async (postId: string) => {
    const search = await client.publicacoes.findMany({
        where: {
            publicacao_id: postId
        }
    });
    return search.length != 0;
}

/**
 * Método que permite verificar se um ginásio existe
 * 
 * @param ginasioId id do ginásio
 */
let checkGinasioExists = async (ginasioId: string) => {
    const search = await client.ginasio.findMany({
        where: {
            ginasio_id: ginasioId,
            isDeleted: false
        }
    });

    return search.length != 0;
}

/**
 * Método que permite verificar se uma notificação existe
 * 
 * @param notiId id da notificação
 */
let checknotificacaoExists = async (notiId: string) => {
    const search = await client.destinos_notificacao.findMany({
        where: {
            noti_id: notiId,
            visto: false

        }
    });

    return search.length != 0;
}
/**
 * Método que permite verificar se um treino existe
 * 
 * @param treinoId id do treino
 */
let checkTreinoExists = async (treinoId: string) => {
    const search = await client.treinos.findMany({
        where: {
            treino_id: treinoId,
            isDeleted: false
        }
    });

    return search.length != 0;
}

/**
 * Método que permite verificar se uma marca existe
 * 
 * @param marcaId id da marca
 */
let checkMarcaExists = async (marcaId: string) => {
    const search = await client.marcas.findMany({
        where: {
            marca_id: marcaId,
            isDeleted: false
        }
    })
    return search.length != 0;
}

/**
 * Método que permite verificar se uma modalidade existe
 * 
 * @param modalidadeId id da modalidade
 */
let checkModalidadeExists = async (modalidadeId: string) => {
    const search = await client.modalidades_ginasio.findMany({
        where: {
            modalidade_id: modalidadeId,
            isDeleted: false
        }
    })
    return search.length != 0;
}

/**
 * Método que permite verificar se uma atividade existe
 * 
 * @param atividadeId id da atividade
 */
let checkAtividadeExists = async (atividadeId: string) => {
    const search = await client.atividades.findMany({
        where: {
            atividade_id: atividadeId,
            isDeleted: false
        }
    })
    return search.length != 0;
}

/**
 * Método que permite verificar se um pedido de agendamento de uma avalição existe
 * 
 * @param agendamentoId id do agendamento
 */
let checkAgendamentoAvaliacaoExists = async (agendamentoId: string) => {
    const search = await client.agendamentos_avaliacoes.findMany({
        where: {
            agendamento_id: agendamentoId,
            isDeleted: false
        }
    })
    return search.length != 0;
}

/**
 * Método que permite verificar se um pedido de agendamento de uma avaliação já foi aceite
 * 
 * @param agendamentoId id do agendamento
 */
let checkAgendamentoAvaliacaoIsAceiteExists = async (agendamentoId: string) => {
    const search = await client.agendamentos_avaliacoes.findMany({
        where: {
            agendamento_id: agendamentoId,
            isDeleted: false,
            isAceite: false
        }
    })
    return search.length != 0;
}

/**
 * Método que permite verificar se um pedido de agendamento de um desafio existe
 * 
 * @param agendamentoId id do agendamento
 */
let checkAgendamentoDesafiosExists = async (agendamentoId: string) => {
    const search = await client.agendamentos_desafios.findMany({
        where: {
            agendamento_id: agendamentoId,
            isDeleted: false
        }
    })
    return search.length != 0;
}

/**
 * Método que permite verificar se um pedido de agendamento de um desafio já foi aceite
 * 
 * @param agendamentoId id do agendamento
 */
let checkAgendamentoDesafioIsAceiteExists = async (agendamentoId: string) => {
    const search = await client.agendamentos_desafios.findMany({
        where: {
            agendamento_id: agendamentoId,
            isDeleted: false,
            isAceite: false
        }
    })
    return search.length != 0;
}

/**
 * Método que permite verificar se uma exercício existe
 * 
 * @param exercicioId id do exercício
 */
let checkExercicioExists = async (exercicioId: string) => {
    const search = await client.exercicios.findMany({
        where: {
            exercicio_id: exercicioId,
            isDeleted: false
        }
    })
    return search.length != 0;
}

/**
 * Método que permite verificar se uma imagem de um exercício existe
 * 
 * @param imagemId id da imagem
 */
let checkImagemExercicioExists = async (imagemId: string) => {
    const search = await client.exercicios_imagens.findMany({
        where: {
            imagem_id: imagemId,
        }
    })
    return search.length != 0;
}

/**
 * Método que permite verificar se um exercício existe dentro de um bloco
 * 
 * @param exercicioBlocoId id do bloco
 */
let checkExercicioBlocoExists = async (exercicioBlocoId: string) => {
    const search = await client.exercicios_bloco.findMany({
        where: {
            exercicios_bloco_id: exercicioBlocoId

        }
    })
    return search.length != 0;
}

/**
 * Método que permite verificar qual a marca de um ginásio
 * 
 * @param ginasioId id do ginasio
 */
let getMarcaGym = async (ginasioId: string) => {
    const search = await client.ginasio.findFirst({
        where: {
            ginasio_id: ginasioId
        },
        select: {
            marca_id: true
        }
    })

    const marca = await client.marcas.findFirst({
        where: {
            marca_id: search?.marca_id
        }
    })

    return marca;
}

/**
 * Método que permite verificar o dono de um ginásio
 * 
 * @param ginasioId id da atividade
 */
let checkDonoGinasio = async (ginasioId: string, donoId: string) => {
    const searchAdmin = await client.ginasio.findFirst({
        where: {
            ginasio_id: ginasioId
        },
        select: {
            marca_id: true,
            marcas: {
                select: {
                    dono_id: true,
                }
            }
        }
    })

    if (searchAdmin?.marcas.dono_id != donoId) {
        return null
    }

    return true;
}

/**
 * Método que permite verificar se o utilizador é um treinador ou um dono do ginásio
 * 
 * @param ginasioId id do ginásio
 * @param userId id do utilizador
 */
let checkDonoOuTreinadorGinasio = async (ginasioId: string, userId: string) => {
    const search = await client.ginasio.findFirst({
        where: {
            ginasio_id: ginasioId,
        },
        select: {
            marca_id: true,
            marcas: {
                select: {
                    dono_id: true,

                }
            }
        }
    })

    if (search?.marcas.dono_id == userId) {
        return true;
    } else {

        const searchTreinador = await client.treinadores_marca.findMany({
            where: {
                marca_id: search.marca_id,
                treinador_uid: userId,
                AND: {
                    users: {
                        isDeleted: false
                    }
                }
            }
        })
        if (searchTreinador.length != 0) {
            return true;
        }
    }

    return false;
}

/**
 * Método que permite verificar se o utilizador é o dono da marca
 * 
 * @param marcaId id da marca
 * @param userId id do utilizador
 */
let checkDonoMarca = async (marcaId: string, userId: string) => {
    const search = await client.marcas.findFirst({
        where: {
            marca_id: marcaId,
            dono_id: userId,
            AND: {
                users: {
                    isDeleted: false
                }
            }
        },
        select: {
            marca_id: true
        }
    })

    if (!search?.marca_id) {
        throw new Error(`Não tem permissões`)
    }

    return true;
}

/**
 * Permite verificar se já existe alguma modalidade registada no ginásio com o mesmo nome
 * @param nome nome da modalidade
 * @param ginasioId id do ginasio

 */
let checkModalidadeNome = async (nome: string, ginasioId: string) => {
    const search = await client.modalidades_ginasio.findMany({
        where: {
            nome,
            ginasio_id: ginasioId,
        },
    });
    return search.length != 0;
};

/**
 * Permite verificar se já se encontra alguma marca com o nome registada
 * @param nome nome da marca

 */
let checkNomeMarca = async (nome: string) => {
    const search = await client.marcas.findMany({
        where: {
            nome,
        },
    });
    return search.length != 0;
};

/**
 * Permite verificar a mobilidade da marca de um utilizador
 * @param userId id do utilizador

 */
let checkMobilidadeMarcaUser = async (userId: string) => {
    const userMarca = await client.alunos_marca.findFirst({
        where: {
            uid: userId,
        }
    })

    if (userMarca === null) {
        const userGinasio = await client.aluno_ginasio.findFirst({
            where: {
                user_id: userId,
                AND: {
                    users: {
                        isDeleted: false
                    }
                }
            }
        })

        return { mobilidade: false, id: userGinasio }
    } else {
        return { mobilidade: true, id: userMarca }
    }
}

/**
 * Permite formatar uma data em DD/MM/YYYY
 * @param data data a ser formatada

 */
let formatDate = async (data: Date) => {
    const date = dayjs(data).locale('pt').format('DD/MM/YYYY').toString();
    return date;
}

/**
 * Permite formatar uma data em DD/MM/YYYY HH:mm
 * @param data data a ser formatada

 */
let formatDateHour = async (data: Date) => {
    const date = dayjs(data).locale('pt').format('DD/MM/YYYY HH:mm').toString();
    return date;
}

/**
 * Permite obter o dia da semana de uma data
 * @param data data a ser formatada

 */
let getDayWeek = async (data: Date) => {
    let dayWeek: IDayWeek;
    const day = data.getDay();
    switch (day) {
        case 0:
            dayWeek = { name: "domingo", abbreviation: "dom." };
            break;
        case 1:
            dayWeek = { name: "segunda-feira", abbreviation: "seg." };
            break;
        case 2:
            dayWeek = { name: "terça-feira", abbreviation: "ter." };
            break;
        case 3:
            dayWeek = { name: "quarta-feira", abbreviation: "qua." };
            break;
        case 4:
            dayWeek = { name: "quinta-feira", abbreviation: "qui." };
            break;
        case 5:
            dayWeek = { name: "sexta-feira", abbreviation: "sex." };
            break;
        case 6:
            dayWeek = { name: "sábado", abbreviation: "sáb." };
            break;
        default:
            break;
    }
    return dayWeek;
}

/**
 * Permite formatar a data em full date
 * @param data data

 */
let formatFullDate = async (data: Date) => {
    let newData: string;
    let s: IDayWeek = (await getDayWeek(data));

    return s;

}

/**
 * Permite verificar se o treinador é autor de um exercicio
 * @param treinadorId id treinador
 * @param exercicioId id exercicio

 */
let checkAutorExercicio = async (treinadorId, exercicioId) => {
    const exercicio = await client.exercicios.findMany({
        where: {
            autor_id: treinadorId,
            exercicio_id: exercicioId
        }
    })

    return exercicio.length != 0
}

/**
 * Permite verificar se treinador é autor de uma avaliação
 * @param treinadorId id treinador

 */
let checkAutorAvaliacao = async (treinadorId) => {
    const exercicio = await client.avaliacoes.findMany({
        where: {
            treinador_id: treinadorId

        }
    })

    return exercicio.length != 0
}

/**
 * Permite verificar se um utilizador é o autor de um treino
 * @param uId id utilizaodr
 * @param treinoId id treino

 */
let checkAutorTreino = async (uId, treinoId) => {
    const treino = await client.treinos.findMany({
        where: {
            uid: uId,
            treino_id: treinoId
        }
    })

    return treino.length != 0
}
/**
 * Permite verificar se um plano de treino percence a um aluno
 * @param alunoId id aluno
 * @param planoId id plano de treino

 */
let checkAutorPlanoTreino = async (alunoId, planoId) => {
    const treino = await client.planos_treino.findMany({
        where: {
            aluno_id: alunoId,
            plano_treino_id: planoId
        }
    })

    return treino.length != 0
}
/**
 * Permite verificar se o treinador é o autor de um plano de treino
 * @param treinadorId id treinador
 * @param planoId id plano de treino

 */
let checkTreinadorPlanoTreino = async (treinadorId, planoId) => {
    const treino = await client.planos_treino.findMany({
        where: {
            treinador_id: treinadorId,
            plano_treino_id: planoId
        }
    })

    return treino.length != 0
}
/**
 * Permite verificar se um utilizador é o autor de um desafio
 * @param criadorId id criador
 * @param desafioId id desafio

 */
let checkAutorDesafio = async (criadorId, desafioId) => {
    const treino = await client.desafios.findMany({
        where: {
            criador_id: criadorId,
            desafio_id: desafioId
        }
    })

    return treino.length != 0
}

/**
 * Permite verificar se o utilizador é o autor do agendamento de avaliacoes
 * @param agendamentoId id agendamento
 * @param uId id utilizador

 */
let checkAutorAgendamentoAvaliacoes = async (agendamentoId, uId) => {
    const agendamento = await client.agendamentos_avaliacoes.findMany({
        where: {
            agendamento_id: agendamentoId,
            uid: uId
        }
    })

    return agendamento.length != 0
}

/**
 * Permite verificar se o utilizador é o autor do agendamento de desafio
 * @param agendamentoId id agendamento
 * @param uId id utilizador

 */
let checkAutorAgendamentoDesafios = async (agendamentoId, uId) => {
    const agendamento = await client.agendamentos_desafios.findMany({
        where: {
            agendamento_id: agendamentoId,
            uid: uId
        }
    })

    return agendamento.length != 0
}

/**
 * Permite verificar se um utilizador é o criador de um gosto em um comentário
 * @param criadorId id criador

 */
let checkAutorGostoComentario = async (criadorId: string) => {
    const agendamento = await client.gostos_comentario.findMany({
        where: {
            criador_id: criadorId,
        }
    })

    return agendamento.length != 0
}

/**
 * Permite verificar se um treinador pertence a um ginasio
 * @param ginasioId id ginasio
 * @param treinadorId id d treinador

 */
let checkTreinadorGinasio = async (ginasioId: string, treinadorId: string) => {
    const searchMarca = await client.ginasio.findUnique({
        where: {
            ginasio_id: ginasioId
        },
        select: {
            marca_id: true
        }
    })



    const searchTreinador = await client.treinadores_marca.findMany({
        where: {
            marca_id: searchMarca.marca_id,
            treinador_uid: treinadorId
        }
    })

    if (!searchTreinador) {
        return null
    }

    return true;
}

/**
 * Permite obter a marca de um treinador
 * @param treinadorId id treinador

 */
let getTreinadorMarca = async (treinadorId: string) => {
    const searchTreinador = await client.treinadores_marca.findFirst({
        where: {
            treinador_uid: treinadorId,
            AND: {
                users: {
                    isDeleted: false
                }
            }

        }
    })

    return searchTreinador.marca_id;
}

/**
 * Permite obter a marca associada a um dono
 * @param donoId id dono

 */
let getAdminMarca = async (donoId: string) => {

    const marca = await client.marcas.findFirst({
        where: {
            dono_id: donoId
        }
    })

    return marca.marca_id;
}

/**
 * Permite obter a marca associada a um ginasio
 * @param ginasioId id do ginasio

 */
let getGinasioMarca = async (ginasioId: string) => {
    const searchGinasio = await client.ginasio.findFirst({
        where: {
            ginasio_id: ginasioId
        }
    })

    return searchGinasio.marca_id;
}

/**
 * Permite obter o id de um ginasio a partir de uma modalidade
 * @param modalidadeId id modalidade

 */
let getModalidadeGinasio = async (modalidadeId: string) => {
    const searchModalidade = await client.modalidades_ginasio.findFirst({
        where: {
            modalidade_id: modalidadeId
        }
    })

    return searchModalidade.ginasio_id;
}

/**
 * Permite obter um exercicio a partir do id da sua imagem
 * @param imagemId id da image

 */
let getImagemExercicio = async (imagemId: string) => {
    const searchImagem = await client.exercicios_imagens.findFirst({
        where: {
            imagem_id: imagemId
        }
    })

    return searchImagem.exercicio_id;
}

/**
 * Permite obter a marca associada a um local de medida
 * @param localId id local de medida

 */
let getLocalMedidaMarca = async (localId: string) => {
    const searchLocal = await client.local_medidas_marca.findFirst({
        where: {
            local_medida_id: localId
        }
    })

    return searchLocal.marca_id;
}

/**
 * Permite obter o ginasio associado a um agendamento de avaliações
 * @param agendamentoId id do agendamento

 */
let getAgendamentoAvaliacoesGinasio = async (agendamentoId: string) => {
    const ginasio = await client.agendamentos_avaliacoes.findFirst({
        where: {
            agendamento_id: agendamentoId
        }
    })

    return ginasio.ginasio_id;
}

/**
 * Obter ginasio id associado a um agendamento de desafios
 * @param agendamentoId Permite buscar o ginasio do agendamento

 */
let getAgendamentoDesafiosGinasio = async (agendamentoId: string) => {
    const ginasio = await client.agendamentos_desafios.findFirst({
        where: {
            agendamento_id: agendamentoId
        }
    })

    return ginasio.ginasio_id;
}

/**
 * Permite obter o exercicio associado a um musculo
 * @param musculoId id do musculo

 */
let getMusculoExercicio = async (musculoId: string) => {
    const searchImagem = await client.exercicios_musculos.findFirst({
        where: {
            musculo_id: musculoId
        }
    })

    return searchImagem.exercicio_id;
}

/**
 * Permite verificar se um user consta nos destinos de uma notificação
 * @param uId id do utilizador
 * @param notiId id da notificação

 */
let checkDestinoNotificacao = async (uId: string, notiId: string) => {
    const searchDestino = await client.destinos_notificacao.findMany({
        where: {
            noti_id: notiId,
            dest_uid: uId,
        }
    })

    return searchDestino.length != 0;
}

/**
 * Permite verificar se um musculo existe
 * @param musculoId id do musculo

 */
let checkMusculoExists = async (musculoId: string) => {
    const musculos = await client.musculos.findMany({
        where: {
            musculo_id: musculoId
        }
    })
    return musculos.length != 0
}

/**
 * Permite verificar se o musculo já existe no exercicio
 * @param musculoId id do musculo
 * @param exercicioId id do exercicio

 */
let checkExercicioMusculoExists = async (musculoId: string, exercicioId: string) => {
    const musculos = await client.exercicios_musculos.findMany({
        where: {
            exercicio_id: exercicioId,
            musculo_id: musculoId
        }
    })
    return musculos.length != 0
}

/**
 * Permite verificar se o nome de um musculo já existe
 * @param nome nome do musculo

 */
let checkMusculoNomeExists = async (nome: string) => {
    const musculos = await client.musculos.findMany({
        where: {
            nome
        }
    })
    return musculos.length != 0
}

/**
 * Permite verificar se um utilizador contém o seu perfil privado
 * @param uid id do utilizador

 */
let checkPerfilPrivado = async (uid: string) => {
    const user = await client.users.findUnique({
        where: {
            uid
        },
        select: {
            definicoes_user: {
                select: {
                    is_privado: true
                }
            }
        }
    })
    return user.definicoes_user.is_privado;
}

/**
 * Obter um desafio pelo id
 * @param desafioId id do desafio

 */
let getDesafio = async (desafioId: string) => {
    const desafio = await client.desafios.findFirst({
        where: {
            desafio_id: desafioId,
            isDeleted: false,
            isEncerrado: false
        }
    })
    return desafio
}


/**
 * Permite verificar se o token consta nos tokens de black list
 * @param token token de sessão

 */
let checkInBlackList = async (token: string) => {
    const tokens = await client.black_list.findMany({
        where: {
            tokenId: token
        }
    })

    return tokens.length != 0;
}

/**
 * Permite verificar se um gosto existe em uma publicação
 * @param publicacaoId id publicação
 * @param criadorId id criador

 */
let checkGostoPublicacaoExists = async (publicacaoId: string, criadorId: string) => {
    const gosto = await client.gostos_publicacao.findFirst({
        where: {
            publicacao_id: publicacaoId,
            criador_id: criadorId
        }
    })

    return gosto
}

/**
 * Permite verificar se o gosto já existe em um comentário
 * @param comentarioId id do comentario
 * @param criadorId id do criador

 */
let checkGostoComentarioExists = async (comentarioId: string, criadorId: string) => {
    const gosto = await client.gostos_comentario.findFirst({
        where: {
            comentario_id: comentarioId,
            criador_id: criadorId
        }
    })

    return gosto
}

/**
 * Permite obter todos os gostos de um comentário
 * @param comentarioId id comentário

 */
let getGostosComentario = async (comentarioId: string) => {
    const gostos = await client.gostos_comentario.findMany({
        where: {
            comentario_id: comentarioId,
        }
    })

    return gostos
}

/**
 * Permite obter todas as identificações realizadas em um comentário
 * @param comentarioId id do comentário

 */
let getIdentificacoesComentario = async (comentarioId: string) => {
    const identificacoes = await client.identificacoes_comentarios.findMany({
        where: {
            comentario_id: comentarioId,
        }
    })

    return identificacoes
}

/**
 * Permite verificar se um comentŕio existe
 * @param comentarioId id do comentário

 */
let checkComentarioExists = async (comentarioId: string) => {
    const comentario = await client.comentarios_publicacao.findMany({
        where: {
            comentario_id: comentarioId,

        }
    })

    return comentario.length != 0
}

/**
 * Verificar se o comentário existe em uma publicação
 * @param comentarioId id do comentario
 * @param publicacaoId id da publicacao

 */
let checkIsComentarioPublicacaoExists = async (comentarioId: string, publicacaoId: string) => {
    const comentario = await client.comentarios_publicacao.findMany({
        where: {
            comentario_id: comentarioId,
            publicacao_id: publicacaoId
        }
    })

    return comentario.length != 0
}

/**
 * Verificar se um utilizador é o criador de um comentário
 * @param comentarioId id comentario
 * @param criadorId id criador 

 */
let checkAutorComentario = async (comentarioId: string, criadorId: string) => {
    const comentario = await client.comentarios_publicacao.findMany({
        where: {
            comentario_id: comentarioId,
            criador_id: criadorId
        }
    })

    return comentario.length != 0
}

/**
 * Permite obter a mobilidade de uma marca
 * @param marcaId id da marca

 */
let getMobilidadeMarca = async (marcaId: string) => {
    const marca = await client.marcas.findFirst({
        where: {
            marca_id: marcaId
        }
    })

    return marca.mobilidade
}

/**
 * Permite verificar se uma submissão já foi efetuada
 * @param desafioId id do desafio
 * @param submissaoId id da submissão

 */
let checkIsSubmissaoDesafio = async (desafioId: string, submissaoId: string) => {
    const submissao = await client.submissoes_desafios.findMany({
        where: {
            submissao_id: submissaoId,
            desafio_id: desafioId
        }
    })

    return submissao.length != 0;
}

/**
 * Permite obter o ginasio de um aluno
 * @param alunoId id do aluno

 */
let getGinasioAluno = async (alunoId: string) => {
    const ginasio = await client.ginasio.findFirst({
        where: {
            aluno_ginasio: {
                some: {
                    user_id: alunoId,
                    AND: {
                        users: {
                            isDeleted: false
                        }
                    }
                }
            }
        }
    })

    return ginasio.ginasio_id
}

/**
 * Permite obter a marca do aluno caso esta tenha mobilidade senão devolve o ginasio
 * @param alunoId id de um aluno
 */
let getMarcaAluno = async (alunoId: string) => {
    const marca = await client.marcas.findFirst({
        where: {
            alunos_marca: {
                some: {
                    uid: alunoId
                }
            }
        }
    })
    let id = marca.marca_id
    if (!id) {
        const ginasio = await client.ginasio.findFirst({
            where: {
                aluno_ginasio: {
                    some: {
                        user_id: alunoId
                    }
                }
            }
        })
        id = ginasio.marca_id
    }

    return id
}

/**
 * Permite obter a marca do aluno
 * @param alunoId id do aluno

 */
let getAlunoMarca = async (alunoId: string) => {
    const searchAluno = await client.alunos_marca.findFirst({
        where: {
            uid: alunoId
        }
    })

    return searchAluno.marca_id;
}

/**
 * Permite obter o ginasio de um aluno
 * @param alunoId id do aluno

 */
let checkAlunoGinasio = async (alunoId: string) => {
    const searchAluno = await client.aluno_ginasio.findFirst({
        where: {
            user_id: alunoId,
            AND: {
                users: {
                    isDeleted: false
                }
            }
        }
    })

    return searchAluno.ginasio_id;
}

/**
 * Permite obter o ginasio associado a um deswafio
 * @param desafioId id do desafio

 */
let getDesafioGinasio = async (desafioId: string) => {
    const searchGinasio = await client.desafios.findFirst({
        where: {
            desafio_id: desafioId
        }
    })

    return searchGinasio.ginasio_id;
}


/**
 * Permite obter o ginasio associadoa um publicação
 * @param publicacaoId id da publicação

 */
let getPublicacaoGinasio = async (publicacaoId: string) => {
    const searchGinasio = await client.publicacoes.findFirst({
        where: {
            publicacao_id: publicacaoId
        }
    })

    return searchGinasio.ginasio_id;
}

/**
 * Permite obter o autor de um exercicio
 * @param exercicioId id de um exercicio

 */
let getAutorExercicio = async (exercicioId: string) => {
    const searchGinasio = await client.exercicios.findFirst({
        where: {
            exercicio_id: exercicioId
        }
    })

    return searchGinasio.autor_id;
}

/**
 * Permite obter treinador associado a um plano de treino
 * @param planoId id do plano de treino

 */
let getTreinadorPlano = async (planoId: string) => {
    const searchGinasio = await client.planos_treino.findFirst({
        where: {
            plano_treino_id: planoId
        }
    })

    return searchGinasio.treinador_id;
}

export {
    checkEmail,
    checkUserIdExists,
    checkUserIdIsDeleted,
    getFuncaoId,
    getUserFuncao,
    checkPostExists,
    checkGinasioExists,
    checkMarcaExists,
    checkTreinoExists,
    checkModalidadeExists,
    checkAtividadeExists,
    checkExercicioExists,
    getMarcaGym,
    checkDonoGinasio,
    checkDonoOuTreinadorGinasio,
    checkDonoMarca,
    checkModalidadeNome,
    checkNomeMarca,
    getUserByID,
    formatDate,
    formatDateHour,
    formatFullDate,
    checkMobilidadeMarcaUser,
    checkDesafioIdExists,
    checkAutorExercicio,
    checkTreinadorGinasio,
    checkMusculoExists,
    checkExercicioMusculoExists,
    findUserDefinicoes,
    checkAvaliacoesExists,
    checkMusculoNomeExists,
    checkPerfilPrivado,
    checkAgendamentoAvaliacaoExists,
    checkAgendamentoDesafiosExists,
    getDesafio,
    checkAutorTreino,
    checkAutorAgendamentoAvaliacoes,
    checkAutorAgendamentoDesafios,
    checkInBlackList,
    checkExercicioBlocoExists,
    checkAgendamentoAvaliacaoIsAceiteExists,
    checkAgendamentoDesafioIsAceiteExists,
    checkPlanoTreinoExists,
    checkAutorPlanoTreino,
    checkPlanoTreinoIsRealizado,
    checknotificacaoExists,
    checkAutorMarca,
    checkAutorDesafio,
    checkTreinador,
    getTreinadorFuncaoId,
    checkAutorPublicacoes,
    checkDesafioDisponivel,
    checkGostoPublicacaoExists,
    checkGostoComentarioExists,
    checkComentarioExists,
    checkIsComentarioPublicacaoExists,
    checkAutorComentario,
    getGostosComentario,
    getIdentificacoesComentario,
    getTreinadorMarca,
    getMobilidadeMarca,
    checkAutorSubmissaoDesafio,
    checkSubmissaoExists,
    checkIsSubmissaoDesafio,
    getGinasioAluno,
    getGinasioMarca,
    getMarcaAluno,
    getAlunoMarca,
    getModalidadeGinasio,
    checkImagemExercicioExists,
    getImagemExercicio,
    getMusculoExercicio,
    getLocalMedidaMarca,
    checkDestinoNotificacao,
    checkTreinadorPlanoTreino,
    checkPublicacaoExists,
    checkAutorGosto,
    getGinasioDesafio,
    getDonoMarca,
    checkAlunoGinasio,
    getDesafioGinasio,
    getAgendamentoAvaliacoesGinasio,
    getAgendamentoDesafiosGinasio,
    getAutorExercicio,
    getPublicacaoGinasio,
    getTreinadorPlano,
    checkAutorAvaliacao,
    getAdminMarca,
    checkAutorGostoComentario,
    checkChangeEmail
}

