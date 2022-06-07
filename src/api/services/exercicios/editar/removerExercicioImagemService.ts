/**
 * @module RemoverExercicioImagemService
 */
import { checkAutorExercicio, checkExercicioExists, checkImagemExercicioExists, getImagemExercicio } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

export class RemoverExercicioImagemService {
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