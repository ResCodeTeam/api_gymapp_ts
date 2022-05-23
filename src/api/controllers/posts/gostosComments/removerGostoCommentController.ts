import { Request, Response } from "express";
import { RemoverGostoCommentService } from "../../../services/posts/gostosComments/removerGostoCommentService";

export class RemoverGostoCommentController {
  async handle(request: Request, response: Response) {
    const comentarioId = request.params.comentarioId;
    const publicacaoId = request.params.publicacaoId;
    const criadorId = request.params.userId;
    if (comentarioId === undefined || publicacaoId === undefined || criadorId === undefined) {
      response.json("Pedido inválido").status(500);
    }

    const removerGostoCommentService = new RemoverGostoCommentService();
    const resp = await removerGostoCommentService.execute(publicacaoId, criadorId, comentarioId)

    response.status(resp.status).json(resp.data);
  }
}