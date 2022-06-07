/**
 * @module RemoverExercicioService
 */
import { client } from "../../prisma/client";
import { checkExercicioExists, checkAutorExercicio } from "../../helpers/dbHelpers";

/**
 * Classe responsavel pelo serviço de remoção de exercícios
 */
export class RemoverExercicioService {
    async execute(exercicioId: string, autorId: string) {
        const exists_dst = await checkExercicioExists(exercicioId);
        if (!exists_dst) {
            return { data: "O exercicio não existe", status: 500 }
        }
        const exercicio = await client.exercicios.findUnique({
            where: {
                exercicio_id: exercicioId
            }
        })

        const isAutor = await checkAutorExercicio(autorId, exercicioId);
        if (!isAutor) {
            return { data: "O exercicio não lhe pertence", status: 500 }
        }

        await client.exercicios.update({
            where: {
                exercicio_id: exercicioId
            },
            data: {
                isDeleted: true
            }
        })

        return {
            data: "O exercício foi removido com sucesso",
            status: 200
        };
    }
}