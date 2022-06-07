/**
 * @module VerTreinadorGinasioController
 */
import { Request, Response } from "express";
import { VerTreinadorGinasioService } from "../../services/ginasios/obterTreinadoresGinasioService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter os treinadores de um ginásio
 */
export class VerTreinadorGinasioController {
  /**
   * Permite obter os treinadores de um ginásio recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerTreinadorGinasioService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uId = request.params.adminId;
    const marcaId = request.params.id;

    try{
      if (uId === undefined || marcaId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verTreinadorGinasioService = new VerTreinadorGinasioService();
      const resp = await verTreinadorGinasioService.execute(uId, marcaId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
