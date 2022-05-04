import { client } from "../../prisma/client";
import { checkUserIdExists, checkGinasioExists, checkModalidadeExists, checkExercicioExists } from "../../helpers/dbHelpers";
import { Exercicio } from "../../Providers/exercicioProvider";


interface ICriarDesafiosService {
    criadorId: string;
    nome: string;
    modalidadeId: string;
    dataInicio: Date;
    dataFim: Date;
    recompensa: number;
    ginasioId: string;
    descricao: string;
    exercicios: Array<Exercicio>;
    regras: Array<{
        descricao: string
    }>;
}

class CriarDesafiosService {
    async execute({ criadorId, nome, modalidadeId, dataInicio, dataFim, recompensa, ginasioId, descricao, exercicios, regras }: ICriarDesafiosService) {
        const exists_criador = await checkUserIdExists(criadorId);
        if (!exists_criador) {
            throw new Error("O user não existe");
        }

        const exists_ginasio = await checkGinasioExists(ginasioId);
        if (!exists_ginasio) {
            throw new Error("Ginásio não existe");
        }

        const exists_modalidade = await checkModalidadeExists(modalidadeId);
        if (!exists_modalidade) {
            throw new Error("A modalidade não existe");
        }

        const desafio = await client.desafios.create({
            data: {
                ginasio_id: ginasioId,
                criador_id: criadorId,
                nome,
                modalidade_id: modalidadeId,
                data_inicio: dataInicio,
                data_fim: dataFim,
                recompensa,
                descricao,
            },
        });

        // para preencher a tabela regras com as suas informações
        for (let i = 0; i < regras.length; i++) {
            await client.regras_desafio.create({
                data: { //desafio_id: desafio["dataValues"]["desafio_id"],
                    desafio_id: desafio.desafio_id,
                    descricao: regras[i]["descricao"],
                },
            });
        }

        // para preencher a tabela exercicios e series com as suas informações
        for (let i = 0; i < exercicios.length; i++) {
            const exists_exercicio = await checkExercicioExists(exercicios[i].exercicioId);
            if (!exists_exercicio) {
                throw new Error("O exercicio não existe");
            }
            const exercicio = await client.exercicios_desafio.create({
                data: {
                    desafio_id: desafio.desafio_id,
                    n_ordem_exercicio: exercicios[i].nOrdem,
                    exercicio_id: exercicios[i].exercicioId,
                    genero: exercicios[i].genero,

                }
            });
            const series = exercicios[i].series
            // console.log(exercicio);
            for (let j = 0; j < series.length; j++) {
                await client.series_desafio.create({
                    data: {
                        exercicio_desafio_id: exercicio.exercicio_desafio_id,
                        n_ordem_serie: series[j].nOrdem,
                        valor: series[j].valor,
                    },
                });
            }
        }

        const desaf = await client.desafios.findFirst({
            where: {
                desafio_id: desafio.desafio_id
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
        return desaf;
    }
}


export { CriarDesafiosService };
