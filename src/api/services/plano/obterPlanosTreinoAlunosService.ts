import { getTreinadorMarca } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

export class ObterPlanosTreinoAlunosService {
  async execute(uid: string) {

    const marcaId = await getTreinadorMarca(uid);
    const midnight = new Date();
    const latenight = new Date();
    midnight.setHours(0, 0, 0, 0);
    latenight.setHours(23, 59, 59);

    const planos = await client.planos_treino.findMany({
      where: {
        aluno: {
          OR: [
            {
              alunos_marca: {
                some: {
                  marca_id: marcaId
                }
              }
            },
            {
              aluno_ginasio: {
                some: {
                  ginasio: {
                    marca_id: marcaId
                  }
                }
              }
            }
          ]
        },
        data: {
          gte: midnight,
          lte: latenight,
        },


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
    });
    return {
      status: 200,
      data: planos
    }
  }
}