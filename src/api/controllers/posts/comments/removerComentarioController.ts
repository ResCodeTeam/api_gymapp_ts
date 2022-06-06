/**
 * @module RemoverComentarioController
 */
import { Request, Response } from "express";
import { RemoverComentarioService } from "../../../services/posts/comments/removerComentarioService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para remover comentários em publicações
 */
export class RemoverComentarioController {
  /**
   * Permite remover um comentário de uma publicação recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link RemoverComentarioService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const criadorId = request.params.userId;
    const comentarioId = request.params.comentarioId;
    const publicacaoId = request.params.publicacaoId;

    try{
      if (
        criadorId === undefined ||
        comentarioId === undefined ||
        publicacaoId === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const removerComentarioService = new RemoverComentarioService();
      const resp = await removerComentarioService.execute(
        criadorId,
        comentarioId,
        publicacaoId
      );
  
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
