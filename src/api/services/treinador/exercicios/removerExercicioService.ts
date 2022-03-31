import { client } from "../../../prisma/client";
import { checkExercicioExists } from "../../../helpers/dbHelpers";

export class RemoverExercicioService{
    async execute(exercicioId : string){
        const exists_dst = await checkExercicioExists(exercicioId);
        if (!exists_dst) {
            throw new Error("O exercicio não existe");
        }
        
        await client.exercicios.update({
            where: {exercicio_id:exercicioId},
            data:{
               isDeleted: true
            }
        })
        return {
            msg: "O exercício foi removido com sucesso",
        };
    }
}