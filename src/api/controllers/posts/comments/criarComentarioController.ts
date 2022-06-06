/**
 * @module CriarComentarioController
 */
import { Request, Response } from "express";
import { CriarComentarioService } from "../../../services/posts/comments/criarComentarioService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para criar comentários em publicações
 */
export class CriarComentarioController {
  /**
   * Permite criar um comentário em uma publicação recebendo os dados por body e parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link CriarComentarioService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const publicacao_id = request.params.id;
    const criador_id = request.params.userId;
    const { comentario, identificacao } = request.body;

    try{
      if (
        publicacao_id === undefined ||
        criador_id === undefined ||
        comentario === undefined ||
        identificacao === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const criarComentarioService = new CriarComentarioService();
      const resp = await criarComentarioService.execute(
        publicacao_id,
        comentario,
        criador_id,
        identificacao
      );
  
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
