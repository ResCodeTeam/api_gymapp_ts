/**
 * @module AlterarVistoController
 */
import { Request, Response } from "express";
import { AlterarVistoService } from "../../services/notificacoes/alterarVistoService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para editar o estado das notificações
 */
export class AlterarVistoController {
  /**
   * Permite editar o estado de uma notificação recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link AlterarVistoService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const destUid = request.params.userId;
    const notiId = request.params.id;

    try{
      if (notiId === undefined || destUid === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const alterarVistoController = new AlterarVistoService();
      const resp = await alterarVistoController.execute({
        notiId,
        destUid,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
