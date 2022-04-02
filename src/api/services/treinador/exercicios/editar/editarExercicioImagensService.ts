import { checkAutorExercicio, checkExercicioExists, checkUserIdExists } from "../../../../helpers/dbHelpers"
import { client } from "../../../../prisma/client";

interface IEditarImagensExercicio{
  exercicioId:string,
  treinadorId:string,
  nome:string,
  descricao:string,
  isTempo:boolean
}

export class EditarExerciciosImagensService{
  async execute({exercicioId,treinadorId,nome, descricao, isTempo}:IEditarImagensExercicio){
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

    const exercicio = await client.exercicios.update({
      where:{
        exercicio_id:exercicioId
      },
      data:{
        nome,
        descricao,
        is_tempo:isTempo
      }
    })

    return {exercicio}
  }
}