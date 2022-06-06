/**
 * @module CriarNotificacaoMarcaController
 */
import { Request, Response } from "express";
import { CriarNotificacaoMarcaService } from "../../services/notificacoes/criarNotificacaoMarcaService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para criar notificações para a marca
 */
export class CriarNotificacaoMarcaController {
  /**
   * Permite criar uma notificação para uma marca recebendo os dados por body e parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link CriarNotificacaoMarcaService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const userId = request.params.adminId;
    const marcaId = request.params.marcaId;
    let { conteudo, tipo } = request.body;

    try{
      if (
        userId === undefined ||
        marcaId === undefined ||
        conteudo === undefined ||
        tipo === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const criarNotificacaoMarcaService = new CriarNotificacaoMarcaService();
      const resp = await criarNotificacaoMarcaService.execute({
        userId,
        marcaId,
        conteudo,
        tipo,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
