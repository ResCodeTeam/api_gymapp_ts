/**
 * @module VerNotificacoesController
 */
import { Request, Response } from "express";
import { VerNotificacoesService } from "../../services/notificacoes/verNotificacoesService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter notificações
 */
export class VerNotificacoesController {
  /**
   * Permite obter notificações recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerNotificacoesService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const origemId = request.params.userId;

    try{
      if (origemId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verNotificacoesService = new VerNotificacoesService();
      const resp = await verNotificacoesService.execute(origemId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
