import { client } from "../../../prisma/client";
import { checkExercicioExists } from "../../../helpers/dbHelpers";

interface IEditarExercicio {
    nome: string,
    descricao: string,
    autorId: string,
    isTempo:boolean
}

export class EditarDesafioService {
    async execute(data:IEditarExercicio,exercicioId:string) {
        const exists_dst = await checkExercicioExists(exercicioId);
        if (!exists_dst) {
            throw new Error("O exercicio não existe");
        }

        const exercicio = await client.exercicios.findUnique({
            where:{
                exercicio_id: exercicioId
            }
        })

        if(data.autorId == exercicio.autor_id){
            const atualizarExercicio = await client.exercicios.update({
                where:{
                    exercicio_id:exercicioId
                },
                data:{
                    nome: data.nome,
                    descricao: data.descricao,
                    autor_id: data.autorId,
                    is_tempo: data.isTempo
                }
            })
            return atualizarExercicio
        }
        else throw new Error ("O exercício não lhe pertence")       
    }
}
