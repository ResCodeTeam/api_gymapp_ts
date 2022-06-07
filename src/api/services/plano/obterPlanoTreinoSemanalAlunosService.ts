/**
 * @module ObterPlanoTreinoSemanalAlunosService
 */

import { getTreinadorMarca } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * Classe responsavel pelo serviço que serve para obter os planos de treinos semanais dos alunos
 */
export class ObterPlanoTreinoSemanalAlunosService {
  async execute(uid: string, startDate: string, endDate: string) {

    const marcaId = await getTreinadorMarca(uid)

    const planos = await client.planos_treino.findMany({
      where: {
        treinador: {
          treinadores_marca: {
            some: {
              marca_id: marcaId
            }
          },

        },
        isDeleted: false,

        data: {
          lte: new Date(endDate),
          gte: new Date(startDate)
        }
      },
      select: {
        data: true,
        isRealizado: true,
        aluno: {
          select: {
            nome: true,
            email: true,
            imagem_url: true,
          }
        },
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
    return { data: planos, status: 200 };
  }
}