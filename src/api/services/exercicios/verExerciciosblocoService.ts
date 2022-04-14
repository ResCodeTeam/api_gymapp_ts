
// ver esta função!!!

import { checkExercicioBlocoExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

interface IExerciciosBloco{
    exerciciosBlocoId:string

}


export class VerExerciciosBlocoService{
    async execute({exerciciosBlocoId}: IExerciciosBloco){

        const exists_exercicio= await checkExercicioBlocoExists(exerciciosBlocoId)
        if(!exists_exercicio){
            throw new Error(" O exercicio não existe")
        }

        const exercicio = await client.exercicios_bloco.findMany({
            where:{
                exercicios_bloco_id:exerciciosBlocoId

            }, select:{
                exercicio_id:true
            }
        
             })
        return {
            exercicio
        }
    }
}