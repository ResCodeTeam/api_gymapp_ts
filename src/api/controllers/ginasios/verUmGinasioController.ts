/**
 * @module VerUmGinasioController
 */
import { Request, Response } from "express";
import { VerUmGinasioService } from "../../services/ginasios/verUmGinasioService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter as informações de um ginásio
 */
export class VerUmGinasioController {
  /**
   * Permite obter as informações de um ginásio recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerUmGinasioService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const donoId = request.params.adminId;
    const ginasioId = request.params.id;

    try{
      if (donoId === undefined || ginasioId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verUmGinasioService = new VerUmGinasioService();
      const resp = await verUmGinasioService.execute(donoId, ginasioId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
