/**
 * @module VerTodasMarcasController
 */
import { Request, Response } from "express";
import { VerTodasMarcasService } from "../../services/marcas/verTodasMarcasService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter todas as marcas de um admin
 */
export class VerTodasMarcasController {
  /**
   * Permite obter todos as marcas de um admin recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerTodasMarcasService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const donoId = request.params.adminId;
    const filtroId = request.params.filtroId;

    try{
      if (donoId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verTodasMarcasService = new VerTodasMarcasService();
      const resp = await verTodasMarcasService.execute({ donoId, filtroId });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
