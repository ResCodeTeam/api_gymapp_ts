/**
 * @module RemoverExercicioController
 */
import { Request, Response } from "express";
import { RemoverExercicioService } from "../../services/exercicios/removerExercicioService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para remover exercícios
 */

export class RemoverExercicioController {
  /**
   * Permite remover exercícios recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link RemoverExercicioService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const exercicioId = request.params.exercicios_id;
    const autorId = request.params.treinadorId;

    try{
      if (exercicioId === undefined || autorId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const removerExercicioService = new RemoverExercicioService();
      const resp = await removerExercicioService.execute(exercicioId, autorId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
