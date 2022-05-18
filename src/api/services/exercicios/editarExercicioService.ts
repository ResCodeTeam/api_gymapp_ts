import { client } from "../../prisma/client";
import { checkExercicioExists, checkAutorExercicio } from "../../helpers/dbHelpers";

interface IEditarExercicio {
    exercicioId: string,
    nome: string,
    descricao: string,
    autorId: string,
    isTempo: boolean
}

export class EditarExercicioService {
    async execute(data: IEditarExercicio) {
        const exists_dst = await checkExercicioExists(data.exercicioId);
        if (!exists_dst) {
            return { data: "O exercicio não existe", status: 500 }
        }

        const exercicio = await client.exercicios.findUnique({
            where: {
                exercicio_id: data.exercicioId
            }
        })

        const isAutor = await checkAutorExercicio(data.autorId, data.exercicioId);
        if (!isAutor) {
            return { data: "O exercicio não lhe pertence", status: 500 }
        }

        const atualizarExercicio = await client.exercicios.update({
            where: {
                exercicio_id: data.exercicioId
            },
            data: {
                nome: data.nome,
                descricao: data.descricao,
                autor_id: data.autorId,
                is_tempo: data.isTempo
            }
        })
        return { data: atualizarExercicio, status: 200 };
    }
}
