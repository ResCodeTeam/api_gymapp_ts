/**
 * @module VerLocaisMedidaController
 */
import { Request, Response } from "express";
import { VerLocaisMedidaService } from "../../services/localMedida/verLocaisMedidaService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter os locais de medida
 */
export class VerLocaisMedidaController {
  /**
   * Permite obter os locais de medida recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerLocaisMedidaService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uId = request.params.treinadorId;

    try{
      if (uId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verLocaisMedidaService = new VerLocaisMedidaService();
      const resp = await verLocaisMedidaService.execute({ uId });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    } 
  }
}
