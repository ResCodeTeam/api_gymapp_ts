/**
 * @module CriarNotificacaoGinasioController
 */
import { Request, Response } from "express";
import { CriarNotificacaoGinasioService } from "../../services/notificacoes/criarNotificacaoGinasioService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para criar notificações para o ginásio
 */
export class CriarNotificacaoGinasioController {
  /**
   * Permite criar uma notificação para um ginásio recebendo os dados por body e parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link CriarNotificacaoGinasioService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const userId = request.params.adminId;
    const ginasioId = request.params.ginasioId;
    const { conteudo, tipo } = request.body;

    try{
      if (
        userId === undefined ||
        ginasioId === undefined ||
        conteudo === undefined ||
        tipo === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const criarNotificacaoMarcarController =
        new CriarNotificacaoGinasioService();
      const resp = await criarNotificacaoMarcarController.execute({
        userId,
        ginasioId,
        conteudo,
        tipo,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
