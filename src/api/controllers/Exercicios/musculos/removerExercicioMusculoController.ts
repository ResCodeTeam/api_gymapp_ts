/**
 * @module RemoverExercicioMusculoController
 */
import { Request, Response } from "express";
import { RemoverExercicioMusculoService } from "../../../services/exercicios/musculos/removerExercicioMusculoService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para remover músculos de um exercicio
 */
export class RemoverExercicioMusculoController {
  /**
   * Permite rmover músculos de um exercício recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link RemoverExercicioMusculoService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const treinadorId = request.params.treinadorId;
    const exercicioId = request.params.exercicioId;
    const musculoId = request.params.musculoId;

    try{
      if (
        treinadorId === undefined ||
        exercicioId === undefined ||
        musculoId === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const removerMusculoExercicioService = new RemoverExercicioMusculoService();
      const resp = await removerMusculoExercicioService.execute(
        treinadorId,
        exercicioId,
        musculoId
      );
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
