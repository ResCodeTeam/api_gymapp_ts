
import { checkExercicioExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

interface IMeusExercicios{
    autorId:string
    
}


export class VerMeusExerciciosService{
    async execute({autorId}: IMeusExercicios){

        const exists_exercicio= await checkExercicioExists(autorId)
        if(!exists_exercicio){
            throw new Error(" O exercicio não existe")
        }

        const exercicio = await client.exercicios.findMany({
            where:{
                autor_id:autorId

            }, select:{
                exercicio_id:true,
                nome:true,
                descricao:true
            }
        
             })
        return exercicio;
    }
}