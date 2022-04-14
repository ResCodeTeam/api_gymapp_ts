import { checkUserIdExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

interface ICriarExercicio{
  nome:string,
  descricao:string,
  autor:string,
  isTempo:boolean,
  imagens: Array<string>,
  musculos: Array<string>
}


export class CriarExercicioService{
  async execute({nome, descricao, autor,isTempo, imagens, musculos}:ICriarExercicio){
    const existsTreinador = await checkUserIdExists(autor);
    if(!existsTreinador){
      throw new Error("Treinador não existe")
    }

    const exercicio = await client.exercicios.create({
      data:{
        descricao:descricao,
        nome:nome,
        is_tempo:isTempo,
        autor_id:autor,
      }
    })


    for(let i = 0; i < imagens.length; i++){
      await client.exercicios_imagens.create({data:{
        url:imagens[i],
        exercicio_id:exercicio.exercicio_id
      }})
    }
    for(let i = 0; i < musculos.length; i++){
      console.log(musculos[i])
      await client.exercicios_musculos.create({
        data:{
          musculos:{
            connect:{
              musculo_id:musculos[i]
            }
          },
          exercicios:{
            connect:{
              exercicio_id:exercicio.exercicio_id
            }
          }
        }
      })
    }

    const resp = await client.exercicios.findUnique({
      where:{
        exercicio_id:exercicio.exercicio_id
      },
      select:{
        nome:true,
        descricao:true,
        is_tempo:true,
        imagens:{
          select:{
            imagem_id:true,
            url:true,
          }
        },
        users:{
          select:{
            uid:true,
            nome:true,
            email:true,
            imagem_url:true,
          }
        },
      }
    })
    return {resp}
  }
}