/**
 * @module CriarPlanoTreinoService
 */

import { checkExercicioExists, checkModalidadeExists, checkUserIdExists, getAlunoMarca, getAutorExercicio, getMarcaGym, getModalidadeGinasio, getTreinadorMarca } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";
import { Bloco } from "../../Providers/blocoProvider";


/**
 * @param alunoId id do aluno
 * @param treinadorId id do treinador
 * @param data data do treino
 * @param modalidadeId id da modalidade
 * @param blocos blocos do plano de treino
 */
export interface IPlano {
  alunoId: string;
  treinadorId: string;
  data: Date;
  modalidadeId: string;
  blocos: Array<Bloco>;
}

export class CriarPlanoTreinoService {
  async execute({ alunoId, treinadorId, data, modalidadeId, blocos }: IPlano) {
    const exists_aluno = await checkUserIdExists(alunoId);
    if (!exists_aluno) {
      return { data: "O aluno não existe", status: 500 }
    }

    const exists_treinador = await checkUserIdExists(treinadorId);
    if (!exists_treinador) {
      return { data: "Ginásio não existe", status: 500 }
    }

    const exists_modalidade = await checkModalidadeExists(modalidadeId);
    if (!exists_modalidade) {
      return { data: "A modalidade não existe", status: 500 }
    }

    const ginasio_modalidade = await getModalidadeGinasio(modalidadeId);
    const marca_modalidade = (await getMarcaGym(ginasio_modalidade)).marca_id;

    const marcaId = await getTreinadorMarca(treinadorId);
    const aluno = await getAlunoMarca(alunoId);

    if (marcaId != aluno || marcaId != marca_modalidade) {
      return { data: "Não possui autorização", status: 500 }
    }

    const plano = await client.planos_treino.create({
      data: {
        aluno_id: alunoId,
        treinador_id: treinadorId,
        data: data,
        modalidade_id: modalidadeId
      },
    })
    try {

      // Percorrer cada bloco
      for (let i = 0; i < blocos.length; i++) {
        const bloco = await client.bloco_treino.create({
          data: {
            n_ordem: blocos[i].nOrdem,
            plano_treino_id: plano.plano_treino_id,
            nome: blocos[i].nome,
            descricao: blocos[i].descricao
          },
        })
        // Percorrer cada exercicio do bloco
        const exercicios = blocos[i].exercicios
        for (let j = 0; j < exercicios.length; j++) {
          const exists_exercicio = await checkExercicioExists(exercicios[i].exercicioId);
          if (!exists_exercicio) {
            return { data: "Exercicio não existe", status: 500 }

          }

          const autor_exercicio = await getAutorExercicio(exercicios[i].exercicioId);
          const marca_autor = await getTreinadorMarca(autor_exercicio);

          const marca_treinador = await getTreinadorMarca(treinadorId)
          if (marca_treinador != marca_autor) {
            return { data: "Exercicio não existe", status: 500 }

          }

          const exr = await client.exercicios_bloco.create({
            data: {
              bloco_id: bloco.bloco_id,
              exercicio_id: exercicios[j].exercicioId,
              n_ordem_exercicio: exercicios[j].nOrdem
            },
          });
          //Percorre as séries de cada exericio
          const series = exercicios[i].series
          for (let y = 0; y < series.length; y++) {
            await client.series_exercicio.create({
              data: {
                n_ordem_serie: series[y].nOrdem,
                valor: series[y].valor,
                exercicios_bloco_id: exr.exercicios_bloco_id
              },
            });
          }
        }
      }

      const planoTreino = await client.planos_treino.findFirst({
        where: {
          plano_treino_id: plano.plano_treino_id
        },
        select: {
          data: true,
          isRealizado: true,
          treinador: {
            select: {
              nome: true,
              email: true,
              imagem_url: true,
            }
          },
          modalidade: {
            select: {
              nome: true
            }
          },
          bloco_treino: {
            select: {
              nome: true,
              descricao: true,
              exercicios_bloco: {
                select: {
                  n_ordem_exercicio: true,
                  series_exercicio: {
                    select: {
                      valor: true,
                      n_ordem_serie: true
                    }
                  },
                  exercicio: {
                    select: {
                      nome: true,
                      descricao: true,
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
                  }
                }
              }
            }
          },
        }
      })
      return { data: planoTreino, status: 200 };
    } catch (err) {
      await client.planos_treino.delete({
        where: {
          plano_treino_id: plano.plano_treino_id
        }
      })
      return { data: "Ocorreu um erro na criação do plano de treino", status: 500 };
    }
  }
}
