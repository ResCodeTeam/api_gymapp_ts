import { checkAutorExercicio, checkExercicioExists, checkExercicioMusculoExists, checkMusculoExists, checkUserIdExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

export class RemoverExercicioMusculoService{
  async execute(treinadorId:string, exercicioId:string,musculoId:string){

    const existsExercicio = await checkExercicioExists(exercicioId);
    if(!existsExercicio){
      throw new Error("Exercicio inexistente")
    }

    const isAutor = await checkAutorExercicio(treinadorId,exercicioId);
    if(!isAutor){
      throw new Error("Não possui autorização")
    }

    const existsMusculo = await checkMusculoExists(musculoId);
    if(!existsMusculo){
      throw new Error("Musculo inexistente")
    }
    
    const containsMusculo = await checkExercicioMusculoExists(musculoId,exercicioId);
    if(!containsMusculo){
      throw new Error("Musculo não adicionado")
    }

    await client.exercicios_musculos.delete({
      where:{
        exercicio_id_musculo_id:{
          exercicio_id:exercicioId,
          musculo_id:musculoId
        }
      }
    })

    return{"msg":"Musculo removido com sucesso"}

  }
}