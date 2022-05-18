import { checkAutorExercicio, checkExercicioExists, checkExercicioMusculoExists, checkMusculoExists, checkUserIdExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

export class AdicionarExercicioMusculoService {
  async execute(treinadorId: string, exercicioId: string, musculoId: string) {

    const existsExercicio = await checkExercicioExists(exercicioId);
    if (!existsExercicio) {
      return { date: "Exercicio inexistente", status: 500 }
    }

    const existsMusculo = await checkMusculoExists(musculoId);
    if (!existsMusculo) {
      return { date: "Musculo inexistente", status: 500 }
    }

    const isAutor = await checkAutorExercicio(treinadorId, exercicioId);
    if (!isAutor) {
      return { date: "Não possui autorização", status: 500 }
    }

    const containsMusculo = await checkExercicioMusculoExists(musculoId, exercicioId);
    if (containsMusculo) {
      return { date: "Musculo já adicionado", status: 500 }
    }

    const musculo = await client.exercicios_musculos.create({
      data: {
        exercicio_id: exercicioId,
        musculo_id: musculoId
      }
    })


    return {data: musculo, status: 200};
  }
}