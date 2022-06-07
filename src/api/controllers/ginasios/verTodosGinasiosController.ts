/**
 * @module VerTodosGinasiosController
 */
import { Request, Response } from "express";
import { VerTodosGinasiosService } from "../../services/ginasios/verTodosGinasiosService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter todos os ginásios de uma marca
 */
export class VerTodosGinasiosController {
  /**
   * Permite obter todos os ginásios de uma marca recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerTodosGinasiosService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const marcaId = request.params.id;
    const userId = request.params.adminId;

    try{
      if (userId === undefined || marcaId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verTodosGinasiosService = new VerTodosGinasiosService();
      const resp = await verTodosGinasiosService.execute({ marcaId, userId });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
