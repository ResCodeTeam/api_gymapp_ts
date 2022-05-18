import { checkAutorExercicio, checkExercicioExists, checkExercicioMusculoExists, checkMusculoExists, checkUserIdExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

export class RemoverExercicioMusculoService {
  async execute(treinadorId: string, exercicioId: string, musculoId: string) {

    const existsExercicio = await checkExercicioExists(exercicioId);
    if (!existsExercicio) {
      return { data: "Exercicio inexistente", status: 500 }
    }

    const isAutor = await checkAutorExercicio(treinadorId, exercicioId);
    if (!isAutor) {
      return { data: "Não possui autorização", status: 500 }
    }

    const existsMusculo = await checkMusculoExists(musculoId);
    if (!existsMusculo) {
      return { data: "Musculo inexistente", status: 500 }
    }

    const containsMusculo = await checkExercicioMusculoExists(musculoId, exercicioId);
    if (!containsMusculo) {
      return { data: "Musculo não adicionado", status: 500 }
    }

    await client.exercicios_musculos.delete({
      where: {
        exercicio_id_musculo_id: {
          exercicio_id: exercicioId,
          musculo_id: musculoId
        }
      }
    })

    return { data: "Musculo removido com sucesso", status: 200 }

  }
}