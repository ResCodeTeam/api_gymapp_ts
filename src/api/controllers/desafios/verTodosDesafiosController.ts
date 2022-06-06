/**
 * @module VerTodosDesafiosController
 */
import { Request, Response } from "express";
import { VerTodosDesafiosService } from "../../services/desafios/verTodosDesafiosService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter todos os desafios de um ginásio
 */
export class VerTodosDesafiosController {
  /**
   * Permite obter todos os desafios de um ginásio recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerTodosDesafiosService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uId = request.params.userId;
    const ginasioId = request.params.id;

    try{
      if (uId === undefined || ginasioId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verTodosDesafiosService = new VerTodosDesafiosService();
      const resp = await verTodosDesafiosService.execute({ uId, ginasioId });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
