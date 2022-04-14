import { checkUserIdExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

export class ObterPlanoTreinoSemanalService{
  async execute(uid:string, startDate:Date, endDate:Date){
    const existsUser = await checkUserIdExists(uid);
    if(!existsUser){
      throw new Error("User não existe")
    }

    if(startDate.getTime()===endDate.getTime() || startDate.getTime() > endDate.getTime()){
      throw new Error("Intervalo de tempo invalido")
    }
//TODO:series
    const planos = await client.planos_treino.findMany({
      where:{
        aluno_id:uid,
        isDeleted:false,
        data:{
          lte:endDate,
          gte:startDate
        }
      },
      select:{
        data:true,
        isRealizado:true,
        treinador:{
          select:{
            nome:true,
            email:true,
            imagem_url:true,
          }
        },
        modalidade:{
          select:{
            nome:true
          }
        },

        bloco_treino:{
          select:{
            nome:true,
            descricao:true,
            exercicios_bloco:{
              select:{
                n_ordem_exercicio:true,
                series_exercicio:{
                  select:{
                    valor:true,
                    n_ordem_serie:true
                  }
                },
                exercicio:{
                  select:{
                    nome:true,
                    descricao:true,
                    imagens:{
                      select:{
                        url:true
                      }
                    },
                    musculos:{
                      select:{
                        musculos:{
                          select:{
                            nome:true,
                            img_url:true
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
    
    return {planos}
  }
}