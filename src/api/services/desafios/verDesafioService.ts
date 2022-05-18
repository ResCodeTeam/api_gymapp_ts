import { checkAlunoGinasio, checkDesafioIdExists, checkMobilidadeMarcaUser, getAlunoMarca, getDesafioGinasio, getDonoMarca, getFuncaoId, getMarcaGym, getTreinadorMarca, getUserFuncao } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

export class VerDesafioService {
    async execute(uId: string, desafioId: string) {

        const exists_desafio = await checkDesafioIdExists(desafioId)
        if (!exists_desafio) {
            return { data: "O desafio não existe", status: 500 }
        }

        const funcao = await getUserFuncao(uId);
        const treinador = await getFuncaoId("Treinador");
        const admin = await getFuncaoId("Administrador");

        const ginasio_desafio = await getDesafioGinasio(desafioId);
        const marca_ginasio = (await getMarcaGym(ginasio_desafio)).marca_id;
        const dono_marca = await getDonoMarca(marca_ginasio);

        // treinador
        if (funcao == treinador) {
            const marca_treinador = await getTreinadorMarca(uId)
            if (marca_treinador != marca_ginasio) {
                return { data: "Não tem autorização", status: 500 }
            }
        }
        // admin
        else if (funcao == admin) {
            if (uId != dono_marca) {
                return { data: "Não tem autorização", status: 500 }
            }
        }
        // aluno
        else {
            const { mobilidade, id } = await checkMobilidadeMarcaUser(uId);
            if (mobilidade) {
                if (id['marca_id'] != marca_ginasio) {
                    return { data: "Não possui permissão", status: 500 }
                }
            }
            else {
                if (id['ginasio_id'] != ginasio_desafio) {
                    return { data: "Não possui permissão", status: 500 }
                }
            }
        }

        const desafio = await client.desafios.findFirst({
            where: {
                desafio_id: desafioId,

                isDeleted: false

            },
            select: {
                desafio_id: true,
                nome: true,
                data_inicio: true,
                data_fim: true,
                recompensa: true,
                isEncerrado: true,
                descricao: true,
                users: {
                    select: {
                        nome: true,
                        email: true,
                        imagem_url: true
                    }
                },
                modalidades_ginasio: {
                    select: {
                        nome: true
                    }
                },
                regras_desafio: {
                    select: {
                        descricao: true
                    }
                },
                exercicios_desafio: {
                    select: {
                        n_ordem_exercicio: true,
                        genero: true,
                        exercicios: {
                            select: {
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
                        },
                        series_desafio: {
                            select: {
                                n_ordem_serie: true,
                                valor: true,
                            }
                        }
                    }
                }
            }
        })
        return { data: desafio, status: 200 };
    }
}