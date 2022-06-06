/**
 * @module RemoverGostoCommentController
 */
import { Request, Response } from "express";
import { RemoverGostoCommentService } from "../../../services/posts/gostosComments/removerGostoCommentService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para remover gostos em comentários
 */
export class RemoverGostoCommentController {
  /**
   * Permite remover um gosto de um comentário recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link RemoverGostoCommentService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const comentarioId = request.params.comentarioId;
    const publicacaoId = request.params.publicacaoId;
    const criadorId = request.params.userId;

    try{
      if (
        comentarioId === undefined ||
        publicacaoId === undefined ||
        criadorId === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const removerGostoCommentService = new RemoverGostoCommentService();
      const resp = await removerGostoCommentService.execute(
        publicacaoId,
        criadorId,
        comentarioId
      );
  
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
