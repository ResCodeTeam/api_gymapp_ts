/**
 * @module VerGinasiosUserController
 */
import { Request, Response } from "express";
import { VerGinasiosUserService } from "../../services/ginasios/verGinasiosUserService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter os ginásios do admin autenticado
 */
export class VerGinasiosUserController {
  /**
   * Permite obter os ginásios do admin autenticado recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerGinasiosUserService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const userId = request.params.alunoId;
  
    const verGinasiosUserService = new VerGinasiosUserService();
    const resp = await verGinasiosUserService.execute({ userId });
    response.status(resp.status).json(resp.data);
  }
}
