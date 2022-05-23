import { Request, Response } from "express";
import { RemoverGostoCommentService } from "../../../services/posts/gostosComments/removerGostoCommentService";

export class RemoverGostoCommentController {
  async handle(request: Request, response: Response) {
    const comentarioId = request.params.comentarioId;
    const publicacaoId = request.params.publicacaoId;
    const criadorId = request.params.userId;
    if (comentarioId === undefined || publicacaoId === undefined || criadorId === undefined) {
      response.status(500).json("Pedido inválido");
    }

    const removerGostoCommentService = new RemoverGostoCommentService();
    const resp = await removerGostoCommentService.execute(publicacaoId, criadorId, comentarioId)

    response.status(resp.status).json(resp.data);
  }
}