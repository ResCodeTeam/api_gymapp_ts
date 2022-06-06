/**
 * @module CriarNotificacaoUserController
 */
import { Request, Response } from "express";
import { CriarNotificacaoUserService } from "../../services/notificacoes/criarNotificacaoUserService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para criar notificações para utilizadores
 */
export class CriarNotificacaoUserController {
  /**
   * Permite criar uma notificação para um utilizador recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link CriarNotificacaoUserService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const destinoId = request.params.id;
    const origemId = request.params.adminId;
    const { conteudo, tipo } = request.body;

    try{
      if (
        destinoId === undefined ||
        origemId === undefined ||
        conteudo === undefined ||
        tipo === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const criarNotificacaoUserService = new CriarNotificacaoUserService();
      const resp = await criarNotificacaoUserService.execute({
        destinoId,
        origemId,
        conteudo,
        tipo,
      });
  
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
