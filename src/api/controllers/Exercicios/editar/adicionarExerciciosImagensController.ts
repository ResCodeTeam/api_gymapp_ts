/**
 * @module AdicionarExerciciosImagensController
 */
import { Request, Response } from "express";
import { AdicionarExerciciosImagensService } from "../../../services/exercicios/editar/adicionarExercicioImagensService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para adicionar imagens em um exercicio
 */
export class AdicionarExerciciosImagensController {
  /**
   * Permite adiicionar imagens em um exercício recebendo os dados por body e parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link AdicionarExerciciosImagensService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const exercicioId = request.params.exercicioId;
    const treinadorId = request.params.treinadorId;
    const { url } = request.body;

    try{
      if (
        exercicioId === undefined ||
        treinadorId === undefined ||
        url === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const adicionarExerciciosImagensService =
        new AdicionarExerciciosImagensService();
      const resp = await adicionarExerciciosImagensService.execute({
        exercicioId,
        treinadorId,
        url,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
