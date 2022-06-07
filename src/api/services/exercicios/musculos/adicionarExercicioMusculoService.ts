/**
 * @module AdicionarExercicioMusculoService
 */
import { checkAutorExercicio, checkExercicioExists, checkExercicioMusculoExists, checkMusculoExists, checkUserIdExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

/**
 * Classe responsavel pelo serviço de criação de músculos em exercícios
 */
export class AdicionarExercicioMusculoService {
  async execute(treinadorId: string, exercicioId: string, musculoId: string) {

    const existsExercicio = await checkExercicioExists(exercicioId);
    if (!existsExercicio) {
      return { data: "Exercicio inexistente", status: 500 }
    }

    const existsMusculo = await checkMusculoExists(musculoId);
    if (!existsMusculo) {
      return { data: "Musculo inexistente", status: 500 }
    }

    const isAutor = await checkAutorExercicio(treinadorId, exercicioId);
    if (!isAutor) {
      return { data: "Não possui autorização", status: 500 }
    }

    const containsMusculo = await checkExercicioMusculoExists(musculoId, exercicioId);
    if (containsMusculo) {
      return { data: "Musculo já adicionado", status: 500 }
    }

    const musculo = await client.exercicios_musculos.create({
      data: {
        exercicio_id: exercicioId,
        musculo_id: musculoId
      }
    })


    return { data: musculo, status: 200 };
  }
}