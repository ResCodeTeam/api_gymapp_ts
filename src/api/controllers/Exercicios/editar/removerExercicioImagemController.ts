/**
 * @module RemoverExercicioImagemController
 */
import { Request, Response } from "express";
import { RemoverExercicioImagemService } from "../../../services/exercicios/editar/removerExercicioImagemService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para remover imagens de um exercicio
 */

export class RemoverExercicioImagemController {
  /**
   * Permite remover imagens a um exercício recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link RemoverExercicioImagemService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const imagemId = request.params.imagemId;
    const treinadorId = request.params.treinadorId;
    const exercicioId = request.params.exercicioId;

    try{
      if (
        imagemId === undefined ||
        treinadorId === undefined ||
        exercicioId === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const removerExercicioImagemService = new RemoverExercicioImagemService();
  
      const resp = await removerExercicioImagemService.execute(
        imagemId,
        treinadorId,
        exercicioId
      );
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
