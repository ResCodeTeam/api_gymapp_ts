import { client } from "../prisma/client";
import dayjs from "dayjs";
import "dayjs/locale/pt";
import { Interface } from "readline";

export interface IDayWeek {
    name: string,
    abbreviation: string
}


let checkEmail = async (email: string) => {
    const search = await client.users.findMany({
        where: {
            email
        }
    })
    return search.length != 0;
}
let findUserDefinicoes = async (uId: string) => {
    const search = await client.definicoes_user.findFirst({
        where: {
            usersuid: uId,
        }
    })
    return search.def_id;
}
let getTreinadorFuncaoId = async () => {
    const search = await client.funcoes.findFirst({
        where: {
            descricao: "Treinador",
        }
    })
    return search.funcao_id;
}
let checkTreinador = async (uId: string) => {
    const search = await client.users.findMany({
        where: {
            uid: uId,
            funcao_id: await getTreinadorFuncaoId(),
        }
    })
    return search.length != 0;
}
let checkDesafioIdExists = async (desafioId: string) => {
    const search = await client.desafios.findMany({
        where: {
            desafio_id: desafioId,
            isDeleted: false,
        }
    })
    return search.length != 0;
}
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
let checkAvaliacoesExists = async (avaliacaoId: string) => {
    const search = await client.avaliacoes.findMany({
        where: {
            avaliacao_id: avaliacaoId
        }
    })
    return search.length != 0;
}
let checkAutorPublicacoes = async (uId, publicacaoId) => {
    const publicacao = await client.publicacoes.findMany({
        where: {
            criador_id: uId,
            publicacao_id: publicacaoId
        }
    })
    return publicacao.length != 0;
}

let checkAutorGosto = async (uId: string, gostoId: string) => {
    const gosto = await client.gostos_publicacao.findMany({
        where: {
            criador_id: uId,
            gosto_id: gostoId
        }
    })
    return gosto.length != 0;
}

let checkAutorMarca = async (uId, marcaId) => {
    const marca = await client.marcas.findMany({
        where: {
            dono_id: uId,
            marca_id: marcaId
        }
    })

    return marca.length != 0
}

let checkAutorSubmissaoDesafio = async (uId, submissao_id) => {
    const subDesafio = await client.submissoes_desafios.findMany({
        where: {
            treinador_id: uId,
            submissao_id: submissao_id
        }
    })

    return subDesafio.length != 0
}

let checkSubmissaoExists = async (submissao_id) => {
    const submissao = await client.submissoes_desafios.findMany({
        where: {
            submissao_id: submissao_id
        }
    })

    return submissao.length != 0
}

let checkPublicacaoExists = async (publicacaoId) => {
    const publicacao = await client.publicacoes.findMany({
        where: {
            publicacao_id: publicacaoId
        }
    })

    return publicacao.length != 0
}

let checkPlanoTreinoExists = async (planoId: string) => {
    const search = await client.planos_treino.findMany({
        where: {
            plano_treino_id: planoId,
            isDeleted: false
        }
    })
    return search.length != 0;
}
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
let checkUserIdExists = async (userId: string) => {
    const search = await client.users.findMany({
        where: {
            uid: userId
        }
    })
    return search.length != 0;
}

let getUserByID = async (userId: string) => {

    const user = await client.users.findUnique({
        where: {
            uid: userId
        }
    })
    return user;
}
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
        throw new Error("função inexistente")
    }
    return search?.funcao_id;
}
async function getUserFuncao(uid: string) {

    const search = await client.users.findUnique({
        where: {
            uid
        },
        select: {
            funcao_id: true
        }
    });

    return search.funcao_id;
}

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

let checkPostExists = async (postId: string) => {
    const search = await client.publicacoes.findMany({
        where: {
            publicacao_id: postId
        }
    });
    return search.length != 0;
}
let checkGinasioExists = async (ginasioId: string) => {
    const search = await client.ginasio.findMany({
        where: {
            ginasio_id: ginasioId,
            isDeleted: false
        }
    });

    return search.length != 0;
}
let checknotificacaoExists = async (notiId: string) => {
    const search = await client.destinos_notificacao.findMany({
        where: {
            noti_id: notiId,
            visto: false

        }
    });

    return search.length != 0;
}
let checkTreinoExists = async (treinoId: string) => {
    const search = await client.treinos.findMany({
        where: {
            treino_id: treinoId,
            isDeleted: false
        }
    });

    return search.length != 0;
}
let checkMarcaExists = async (marcaId: string) => {
    const search = await client.marcas.findMany({
        where: {
            marca_id: marcaId,
            isDeleted: false
        }
    })
    return search.length != 0;
}
let checkModalidadeExists = async (modalidadeId: string) => {
    const search = await client.modalidades_ginasio.findMany({
        where: {
            modalidade_id: modalidadeId,
            isDeleted: false
        }
    })
    return search.length != 0;
}
let checkAtividadeExists = async (atividadeId: string) => {
    const search = await client.atividades.findMany({
        where: {
            atividade_id: atividadeId,
            isDeleted: false
        }
    })
    return search.length != 0;
}
let checkAgendamentoAvaliacaoExists = async (agendamentoId: string) => {
    const search = await client.agendamentos_avaliacoes.findMany({
        where: {
            agendamento_id: agendamentoId,
            isDeleted: false
        }
    })
    return search.length != 0;
}

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

let checkAgendamentoDesafiosExists = async (agendamentoId: string) => {
    const search = await client.agendamentos_desafios.findMany({
        where: {
            agendamento_id: agendamentoId,
            isDeleted: false
        }
    })
    return search.length != 0;
}

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

let checkExercicioExists = async (exercicioId: string) => {
    const search = await client.exercicios.findMany({
        where: {
            exercicio_id: exercicioId,
            isDeleted: false
        }
    })
    return search.length != 0;
}

let checkImagemExercicioExists = async (imagemId: string) => {
    const search = await client.exercicios_imagens.findMany({
        where: {
            imagem_id: imagemId,
        }
    })
    return search.length != 0;
}

let checkExercicioBlocoExists = async (exercicioBlocoId: string) => {
    const search = await client.exercicios_bloco.findMany({
        where: {
            exercicios_bloco_id: exercicioBlocoId

        }
    })
    return search.length != 0;
}
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
        throw new Error(`Não tem permissões`)
    }

    return true;
}
let checkDonoOuTreinadorGinasio = async (ginasioId: string, userId: string) => {
    const search = await client.ginasio.findFirst({
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

    if (search?.marcas.dono_id == userId) {
        return true;
    } else {

        const searchTreinador = await client.treinadores_marca.findMany({
            where: {
                marca_id: search.marca_id,
                treinador_uid: userId
            }
        })
        if (searchTreinador.length != 0) {
            return true;
        }
    }

    return false;
}
let checkDonoMarca = async (marcaId: string, userId: string) => {
    const search = await client.marcas.findFirst({
        where: {
            marca_id: marcaId,
            dono_id: userId
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
// função que permite verificar se já existe alguma modalidade registada no ginásio com aquele nome
let checkModalidadeNome = async (nome: string, ginasioId: string) => {
    const search = await client.modalidades_ginasio.findMany({
        where: {
            nome,
            ginasio_id: ginasioId,
        },
    });
    return search.length != 0;
};
// função que permite verificar se já se encontra alguma marca com o nome registada
let checkNomeMarca = async (nome: string) => {
    const search = await client.marcas.findMany({
        where: {
            nome,
        },
    });
    return search.length != 0;
};


let checkMobilidadeMarcaUser = async (userId: string) => {
    const userMarca = await client.alunos_marca.findFirst({
        where: {
            uid: userId,
        }
    })

    if (userMarca === null) {
        const userGinasio = await client.aluno_ginasio.findFirst({
            where: {
                user_id: userId
            }
        })

        return { mobilidade: false, id: userGinasio }
    } else {
        return { mobilidade: true, id: userMarca }
    }
}

let formatDate = async (data: Date) => {
    const date = dayjs(data).locale('pt').format('DD/MM/YYYY').toString();
    return date;
}

let formatDateHour = async (data: Date) => {
    const date = dayjs(data).locale('pt').format('DD/MM/YYYY HH:mm').toString();
    return date;
}

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

let formatFullDate = async (data: Date) => {
    let newData: string;
    let s: IDayWeek = (await getDayWeek(data));
    console.log(s.abbreviation);
    console.log(s.name);

    return s;

}

let checkAutorExercicio = async (treinadorId, exercicioId) => {
    const exercicio = await client.exercicios.findMany({
        where: {
            autor_id: treinadorId,
            exercicio_id: exercicioId
        }
    })

    return exercicio.length != 0
}

let checkAutorTreino = async (uId, treinoId) => {
    const treino = await client.treinos.findMany({
        where: {
            uid: uId,
            treino_id: treinoId
        }
    })

    return treino.length != 0
}
let checkAutorPlanoTreino = async (alunoId, planoId) => {
    const treino = await client.planos_treino.findMany({
        where: {
            aluno_id: alunoId,
            plano_treino_id: planoId
        }
    })

    return treino.length != 0
}
let checkTreinadorPlanoTreino = async (treinadorId, planoId) => {
    const treino = await client.planos_treino.findMany({
        where: {
            treinador_id: treinadorId,
            plano_treino_id: planoId
        }
    })

    return treino.length != 0
}
let checkAutorDesafio = async (criadorId, desafioId) => {
    const treino = await client.desafios.findMany({
        where: {
            criador_id: criadorId,
            desafio_id: desafioId
        }
    })

    return treino.length != 0
}
let checkAutorAgendamentoAvaliacoes = async (agendamentoId, uId) => {
    const agendamento = await client.agendamentos_avaliacoes.findMany({
        where: {
            agendamento_id: agendamentoId,
            uid: uId
        }
    })

    return agendamento.length != 0
}

let checkAutorAgendamentoDesafios = async (agendamentoId, uId) => {
    const agendamento = await client.agendamentos_desafios.findMany({
        where: {
            agendamento_id: agendamentoId,
            uid: uId
        }
    })

    return agendamento.length != 0
}

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
        throw new Error(`Não tem permissões`)
    }

    return true;
}

let getTreinadorMarca = async (treinadorId: string) => {

    const searchTreinador = await client.treinadores_marca.findFirst({
        where: {
            treinador_uid: treinadorId
        }
    })

    return searchTreinador.marca_id;
}

let getGinasioMarca = async (ginasioId: string) => {
    const searchGinasio = await client.ginasio.findFirst({
        where:{
            ginasio_id: ginasioId
        }
    })

    return searchGinasio.marca_id;
}

let getModalidadeGinasio = async(modalidadeId: string) => {
    const searchModalidade = await client.modalidades_ginasio.findFirst({
        where:{
            modalidade_id: modalidadeId
        }
    })

    return searchModalidade.ginasio_id;
}

let getImagemExercicio = async(imagemId: string) => {
    const searchImagem = await client.exercicios_imagens.findFirst({
        where:{
            imagem_id: imagemId
        }
    })

    return searchImagem.exercicio_id;
}

let getLocalMedidaMarca = async(localId: string) => {
    const searchLocal = await client.local_medidas_marca.findFirst({
        where:{
            local_medida_id: localId
        }
    })

    return searchLocal.marca_id;
}

let getAgendamentoAvaliacoesGinasio = async(agendamentoId: string) => {
    const ginasio = await client.agendamentos_avaliacoes.findFirst({
        where:{
            agendamento_id: agendamentoId
        }
    })

    return ginasio.ginasio_id;
}

let getAgendamentoDesafiosGinasio = async(agendamentoId: string) => {
    const ginasio = await client.agendamentos_desafios.findFirst({
        where:{
            agendamento_id: agendamentoId
        }
    })

    return ginasio.ginasio_id;
}

let getMusculoExercicio = async(musculoId: string) => {
    const searchImagem = await client.exercicios_musculos.findFirst({
        where:{
            musculo_id: musculoId
        }
    })

    return searchImagem.exercicio_id;
} 

let checkDestinoNotificacao = async(uId: string, notiId: string) => {
    const searchDestino = await client.destinos_notificacao.findMany({
        where:{
            noti_id: notiId,
            dest_uid: uId,
        }
    })

    return searchDestino.length != 0;
} 

let checkMusculoExists = async (musculoId: string) => {
    const musculos = await client.musculos.findMany({
        where: {
            musculo_id: musculoId
        }
    })
    return musculos.length != 0
}

let checkExercicioMusculoExists = async (musculoId: string, exercicioId: string) => {
    const musculos = await client.exercicios_musculos.findMany({
        where: {
            exercicio_id: exercicioId,
            musculo_id: musculoId
        }
    })
    return musculos.length != 0
}

let checkMusculoNomeExists = async (nome: string) => {
    const musculos = await client.musculos.findMany({
        where: {
            nome
        }
    })
    return musculos.length != 0
}

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

let checkInBlackList = async (token: string) => {
    const tokens = await client.black_list.findMany({
        where: {
            tokenId: token
        }
    })

    return tokens.length != 0;
}

let checkGostoPublicacaoExists = async (publicacaoId: string, criadorId: string) => {
    const gosto = await client.gostos_publicacao.findFirst({
        where: {
            publicacao_id: publicacaoId,
            criador_id: criadorId
        }
    })

    return gosto
}

let checkGostoComentarioExists = async (comentarioId: string, criadorId: string) => {
    const gosto = await client.gostos_comentario.findFirst({
        where: {
            comentario_id: comentarioId,
            criador_id: criadorId
        }
    })

    return gosto
}

let getGostosComentario = async (comentarioId: string) => {
    const gostos = await client.gostos_comentario.findMany({
        where: {
            comentario_id: comentarioId,
        }
    })

    return gostos
}

let getIdentificacoesComentario = async (comentarioId: string) => {
    const identificacoes = await client.identificacoes_comentarios.findMany({
        where: {
            comentario_id: comentarioId,
        }
    })

    return identificacoes
}

let checkComentarioExists = async (comentarioId: string) => {
    const comentario = await client.comentarios_publicacao.findMany({
        where: {
            comentario_id: comentarioId,

        }
    })

    return comentario.length != 0
}

let checkIsComentarioPublicacaoExists = async (comentarioId: string, publicacaoId: string) => {
    const comentario = await client.comentarios_publicacao.findMany({
        where: {
            comentario_id: comentarioId,
            publicacao_id: publicacaoId
        }
    })

    return comentario.length != 0
}
let checkAutorComentario = async (comentarioId: string, criadorId: string) => {
    const comentario = await client.comentarios_publicacao.findMany({
        where: {
            comentario_id: comentarioId,
            criador_id: criadorId
        }
    })

    return comentario.length != 0
}

let getMobilidadeMarca = async (marcaId: string) => {
    const marca = await client.marcas.findFirst({
        where: {
            marca_id: marcaId
        }
    })

    return marca.mobilidade
}

let checkIsSubmissaoDesafio = async (desafioId: string, submissaoId: string) => {
    const submissao = await client.submissoes_desafios.findMany({
        where: {
            submissao_id: submissaoId,
            desafio_id: desafioId
        }
    })

    return submissao.length != 0;
}

let getGinasioAluno = async (alunoId: string) => {
    const ginasio = await client.ginasio.findFirst({
        where: {
            aluno_ginasio: {
                every: {
                    user_id: alunoId
                }
            }
        }
    })

    return ginasio.ginasio_id
}

let getMarcaAluno = async (alunoId: string) => {
    const marca = await client.marcas.findFirst({
        where: {
            alunos_marca: {
                every: {
                    uid: alunoId
                }
            }
        }
    })

    return marca.marca_id
}

let getAlunoMarca = async (alunoId: string) => {
    const searchAluno = await client.alunos_marca.findFirst({
        where: {
            uid: alunoId
        }
    })

    return searchAluno.marca_id;
}

let checkAlunoGinasio = async (alunoId: string) => {
    const searchAluno = await client.aluno_ginasio.findFirst({
        where: {
            user_id: alunoId
        }
    })

    return searchAluno.ginasio_id;
}

let getDesafioGinasio = async (desafioId: string) => {
    const searchGinasio = await client.desafios.findFirst({
        where: {
            desafio_id: desafioId
        }
    })

    return searchGinasio.ginasio_id;
}

let getAutorExercicio = async (exercicioId: string) => {
    const searchGinasio = await client.exercicios.findFirst({
        where: {
            exercicio_id: exercicioId
        }
    })

    return searchGinasio.autor_id;
}

export {
    checkEmail,
    checkUserIdExists,
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
    getAutorExercicio
}

