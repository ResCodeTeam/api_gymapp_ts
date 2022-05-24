import { Request, Response } from "express";
import { CriarGostoCommentService } from "../../../services/posts/gostosComments/criarGostoCommentService";

export class CriarGostoCommentController {
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
