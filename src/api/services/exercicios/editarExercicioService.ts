/**
 * @module EditarExercicioService
 */
import { client } from "../../prisma/client";
import { checkExercicioExists, checkAutorExercicio } from "../../helpers/dbHelpers";

/**
 * @param exercicioId id do exercício a editar
 * @param nome nome do exercício a criar
 * @param descricao descricao do exercício
 * @param autorId id do autor do exercício
 * @param isTempo indica se o exercício é por tempo ou não
 */
export interface IEditarExercicio {
    exercicioId: string,
    nome: string,
    descricao: string,
    autorId: string,
    isTempo: boolean
}

/**
 * Classe responsavel pelo serviço de edição de exercícios
 */
export class EditarExercicioService {
    /**
 * Método que editar um exercício na base de dados tendo em conta todas as verificações necessárias
 * 
 * @param IEditarExercicio interface de dados do serviço
 */
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
