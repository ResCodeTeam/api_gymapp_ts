import { checkMobilidadeMarcaUser, checkUserIdExists, getAlunoMarca, getFuncaoId, getMarcaGym, getTreinadorMarca, getUserFuncao } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

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
        isRealizado: true,
        data: {
          lte: new Date(endDate),
          gte: new Date(startDate)
        }
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
    return { data: planos, status: 200 };
  }
}