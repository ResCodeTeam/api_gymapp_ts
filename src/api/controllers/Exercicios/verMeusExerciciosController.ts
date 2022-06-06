/**
 * @module VerMeusExerciciosController
 */
import { Request, Response } from "express";
import { VerMeusExerciciosService } from "../../services/exercicios/verMeusExerciciosService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para o utilizador obter os seus exercícios
 */

export class VerMeusExerciciosController {
  /**
   * Permite ao utilizador obter os seus exercícios os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerMeusExerciciosService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const autorId = request.params.treinadorId;

    try{
      if (autorId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verMeusExerciciosService = new VerMeusExerciciosService();
      const resp = await verMeusExerciciosService.execute({ autorId });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
