import { checkAutorExercicio, checkExercicioExists, checkUserIdExists } from "../../../../helpers/dbHelpers"
import { client } from "../../../../prisma/client";

interface IEditarImagensExercicio{
  exercicioId:string,
  treinadorId:string,
  url:string,
}

export class AdicionarExerciciosImagensService{
  async execute({exercicioId,treinadorId, url}:IEditarImagensExercicio){
    const existsExercicio= await checkExercicioExists(exercicioId);
    if(!existsExercicio){
      throw new Error("Exercicio não existe")
    }

    const existsUser = await checkUserIdExists(treinadorId);
    if(!existsUser){
      throw new Error("Treinador não existe")
    }

    const isAutor = await checkAutorExercicio(treinadorId,exercicioId);
    if(!isAutor){
      throw new Error("Não possui permissões")
    }

    const imagem = await client.exercicios_imagens.create({
      data:{
        url,
        exercicio_id:exercicioId
      }
    })

    return {imagem}
  }
}