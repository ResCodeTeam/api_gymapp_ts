/**
 * @module RemoverExercicioImagemService
 */
import { checkAutorExercicio, checkExercicioExists, checkImagemExercicioExists, getImagemExercicio } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

/**
 * Classe responsavel pelo serviço de remoção de imagens dos exercícios
 */
export class RemoverExercicioImagemService {
  /**
 * Método que permite remover uma imagem de um exercício na base de dados tendo em conta todas as verificações necessárias
 * 
 * @param imagemId id da imagem a remover
 * @param treinadorId id do treinador
 * @param exercicioId id do exercício
 */
  async execute(imagemId: string, treinadorId: string, exercicioId: string) {
    const exists_exercicio = await checkExercicioExists(exercicioId)
    if (!exists_exercicio) {
      return { data: "O exercício não existe", status: 500 }
    }
    const exists_image = await checkImagemExercicioExists(imagemId)
    if (!exists_image) {
      return { data: "A imagem não existe", status: 500 }
    }

    const isAutor = await checkAutorExercicio(treinadorId, exercicioId);
    if (!isAutor) {
      return { data: "Não possui autorização", status: 500 }
    }

    let exercicio = await getImagemExercicio(imagemId);
    if (exercicio == exercicioId) {
      await client.exercicios_imagens.delete({
        where: {
          imagem_id: imagemId,
        }
      })
    }
    else {
      return { data: "A imagem não pertence ao exercicio", status: 500 }
    }

    return { data: "imagem removida com sucesso", status: 200 }
  }
}