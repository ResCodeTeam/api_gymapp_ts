/**
 * @module AdicionarExercicioMusculoController
 */
import { Request, Response } from "express";
import { AdicionarExercicioMusculoService } from "../../../services/exercicios/musculos/adicionarExercicioMusculoService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para adicionar músculos em um exercicio
 */

export class AdicionarExercicioMusculoController {
  /**
   * Permite adicionar músculos em um exercício recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link AdicionarExercicioMusculoService}
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
  
      const adicionarExercicioMusculoService =
        new AdicionarExercicioMusculoService();
      const resp = await adicionarExercicioMusculoService.execute(
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
