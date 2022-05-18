import { checkAutorExercicio, checkExercicioExists, checkUserIdExists } from "../../../helpers/dbHelpers"
import { client } from "../../../prisma/client";

interface IEditarImagensExercicio {
  exercicioId: string,
  treinadorId: string,
  url: string,
}

export class AdicionarExerciciosImagensService {
  async execute({ exercicioId, treinadorId, url }: IEditarImagensExercicio) {
    const existsExercicio = await checkExercicioExists(exercicioId);
    if (!existsExercicio) {
      return { date: "Exercicio não existe", status: 500 }
    }

    const existsUser = await checkUserIdExists(treinadorId);
    if (!existsUser) {
      return { date: "Treinador não existe", status: 500 }
    }


    const isAutor = await checkAutorExercicio(treinadorId, exercicioId);
    if (!isAutor) {
      return { date: "Não possui permissões", status: 500 }
    }

    const imagem = await client.exercicios_imagens.create({
      data: {
        url,
        exercicio_id: exercicioId
      }
    })

    return imagem;
  }
}