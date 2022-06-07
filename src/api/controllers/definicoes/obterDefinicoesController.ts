/**
 * @module ObterDefinicoesController
 */
import { Request, Response } from "express";
import { ObterDefinicoesService } from "../../services/definicoes/obterDefinicoesService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter as defincições de um utilizador
 */
export class ObterDefinicoesController {
  /**
   * Permite obter as definições de um utilizador recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link ObterDefinicoesService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uid = request.params.userId;

    try{
      if (uid === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const obterDefinicoesService = new ObterDefinicoesService();
  
      const resp = await obterDefinicoesService.execute(uid);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
