/**
 * @module AdicionarExerciciosImagensService
 */
import { checkAutorExercicio, checkExercicioExists, checkUserIdExists } from "../../../helpers/dbHelpers"
import { client } from "../../../prisma/client";

/**
 * @param exercicioId id do exercício
 * @param treinadorId id do treinador
 * @param url url da imagem a adicionar ao exercício
 */
export interface IEditarImagensExercicio {
  exercicioId: string,
  treinadorId: string,
  url: string,
}

/**
 * Classe responsavel pelo serviço de criação de imagens em exercícios
 */
export class AdicionarExerciciosImagensService {
  /**
 * Método que permite inserir imagens em um exercício na base de dados tendo em conta todas as verificações necessárias
 * 
 * @param IEditarImagensExercicio interface de dados do serviço
 */
  async execute({ exercicioId, treinadorId, url }: IEditarImagensExercicio) {
    const existsExercicio = await checkExercicioExists(exercicioId);
    if (!existsExercicio) {
      return { data: "Exercicio não existe", status: 500 }
    }

    const existsUser = await checkUserIdExists(treinadorId);
    if (!existsUser) {
      return { data: "Treinador não existe", status: 500 }
    }


    const isAutor = await checkAutorExercicio(treinadorId, exercicioId);
    if (!isAutor) {
      return { data: "Não possui permissões", status: 500 }
    }

    const imagem = await client.exercicios_imagens.create({
      data: {
        url,
        exercicio_id: exercicioId
      }
    })

    return { data: imagem, status: 200 };
  }
}