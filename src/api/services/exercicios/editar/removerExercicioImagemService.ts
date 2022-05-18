import { checkAutorExercicio, checkExercicioExists, checkImagemExercicioExists, getImagemExercicio } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

export class RemoverExercicioImagemService {
  async execute(imagemId: string, treinadorId: string, exercicioId: string) {
    const exists_exercicio = await checkExercicioExists(exercicioId)
    if (!exists_exercicio) {
      return { date: "O exercício não existe", status: 500 }
    }
    console.log(exercicioId);
    const exists_image = await checkImagemExercicioExists(imagemId)
    if (!exists_image) {
      return { date: "A imagem não existe", status: 500 }
    }

    const isAutor = await checkAutorExercicio(treinadorId, exercicioId);
    if (!isAutor) {
      return { date: "Não possui autorização", status: 500 }
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
      return { date: "A imagem não pertence ao exercicio", status: 500 }
    }


    return { "msg": "imagem removida com sucesso" }
  }
}