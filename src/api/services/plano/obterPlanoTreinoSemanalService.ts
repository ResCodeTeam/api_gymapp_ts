import { checkMobilidadeMarcaUser, checkUserIdExists, getAlunoMarca, getFuncaoId, getMarcaGym, getTreinadorMarca, getUserFuncao } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

export class ObterPlanoTreinoSemanalService{
  async execute(uid:string, startDate:Date, endDate:Date, askerID: string){

    const funcao = await getUserFuncao(askerID);
    const treinador = await getFuncaoId("Treinador");
    
    // treinador - obter PlanoTreinoAluno
    if(funcao == treinador)
    {
      const existsUser = await checkUserIdExists(uid);
      if(!existsUser){
        throw new Error("User não existe")
      }

      const marca_treinador = await getTreinadorMarca(askerID)

      const { mobilidade, id } = await checkMobilidadeMarcaUser(uid);
      if(mobilidade){
        if(id['marca_id'] != marca_treinador)
        {
          throw new Error("Não possui permissão")
        }
      }
      else{
        const marca_gym = (await getMarcaGym(id['ginasio_id'])).marca_id;
        if(marca_gym != marca_treinador)
        {
            throw new Error("Não possui permissão")
        }
      }
    }

    if(startDate.getTime()===endDate.getTime() || startDate.getTime() > endDate.getTime()){
      throw new Error("Intervalo de tempo invalido")
    }
    
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
    return {data: planos, status: 200};
  }
}