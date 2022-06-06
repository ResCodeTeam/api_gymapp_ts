/**
 * @module VerUmaMarcaController
 */
import { Request, Response } from "express";
import { VerUmaMarcaService } from "../../services/marcas/verUmaMarcaService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter as informações de uma marca
 */
export class VerUmaMarcaController {
  /**
   * Permite obter as informações de uma marca recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerUmaMarcaService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const donoId = request.params.adminId;
    const marcaId = request.params.id;

    try{
      if (donoId === undefined || marcaId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verUmaMarcaService = new VerUmaMarcaService();
      const resp = await verUmaMarcaService.execute({ donoId, marcaId });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
