import { client } from "../../prisma/client";
import { checkExercicioExists, checkAutorExercicio } from "../../helpers/dbHelpers";

export class RemoverExercicioService{
    async execute(exercicioId : string, autorId: string){
        const exists_dst = await checkExercicioExists(exercicioId);
        if (!exists_dst) {
            throw new Error("O exercicio não existe");
        }
        const exercicio = await client.exercicios.findUnique({
            where:{
                exercicio_id:exercicioId
            }
        })

        const isAutor = await checkAutorExercicio(autorId,exercicioId);
        if(!isAutor){
            throw new Error("O exercicio não lhe pertence");
        }

        await client.exercicios.update({
            where: {
                exercicio_id:exercicioId
            },
            data:{
                isDeleted: true
            }
        })

        return {
            msg: "O exercício foi removido com sucesso",
        };
    }
}