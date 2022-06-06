/**
 * @module CriarGostoCommentController
 */
import { Request, Response } from "express";
import { CriarGostoCommentService } from "../../../services/posts/gostosComments/criarGostoCommentService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para criar gostos em comentários
 */
export class CriarGostoCommentController {
  /**
   * Permite criar um gosto em um comentário recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link CriarGostoCommentService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const comentarioId = request.params.comentarioId;
    const publicacaoId = request.params.id;
    const criadorId = request.params.userId;

    try{
      if (
        comentarioId === undefined ||
        publicacaoId === undefined ||
        criadorId === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const criarGostoCommentService = new CriarGostoCommentService();
      const resp = await criarGostoCommentService.execute(
        comentarioId,
        publicacaoId,
        criadorId
      );
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
