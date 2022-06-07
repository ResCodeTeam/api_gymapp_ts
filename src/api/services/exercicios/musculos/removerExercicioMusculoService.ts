/**
 * @module RemoverExercicioMusculoService
 */
import { checkAutorExercicio, checkExercicioExists, checkExercicioMusculoExists, checkMusculoExists, checkUserIdExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

/**
 * Classe responsavel pelo serviço de remoção de músculos dos exercícios
 */
export class RemoverExercicioMusculoService {
  /**
 * Método que permite remover um músculo de um exercício na base de dados tendo em conta todas as verificações necessárias
 * 
 * @param treinadorId id do treinador
 * @param exercicioId id do exercício
 * @param musculoId id do músculo a remover
 */
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