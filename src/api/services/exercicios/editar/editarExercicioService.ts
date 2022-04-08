import { client } from "../../../prisma/client";
import { checkExercicioExists, checkAutorExercicio } from "../../../helpers/dbHelpers";

interface IEditarExercicio {
    exercicioId: string,
    nome: string,
    descricao: string,
    autorId: string,
    isTempo:boolean
}

export class EditarExercicioService {
    async execute(data:IEditarExercicio) {
        const exists_dst = await checkExercicioExists(data.exercicioId);
        if (!exists_dst) {
            throw new Error("O exercicio não existe");
        }

        const exercicio = await client.exercicios.findUnique({
            where:{
                exercicio_id: data.exercicioId
            }
        })

        const isAutor = await checkAutorExercicio(data.autorId,data.exercicioId);
        if(!isAutor){
            throw new Error("O exercicio não lhe pertence");
        }

        //if(data.autorId == exercicio.autor_id){
        //    const atualizarExercicio = await client.exercicios.update({
        //        where:{
        //            exercicio_id:data.exercicioId
        //        },
        //        data:{
        //            nome: data.nome,
        //            descricao: data.descricao,
        //            autor_id: data.autorId,
        //            is_tempo: data.isTempo
        //        }
        //    })
        //    return atualizarExercicio
        //}
        //else throw new Error ("O exercício não lhe pertence")
        const atualizarExercicio = await client.exercicios.update({
            where:{
                exercicio_id:data.exercicioId
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
}
