import { Request, Response } from "express";
import { CriarGostoCommentService } from "../../../services/posts/gostosComments/criarGostoCommentService";

export class CriarGostoCommentController{
  async handle(request:Request, response:Response){
    const comentarioId = request.params.comentarioId;
    const publicacaoId = request.params.id;
    const criadorId = request.params.userId;

    const criarGostoCommentService = new CriarGostoCommentService();
    const resp = await criarGostoCommentService.execute(comentarioId,publicacaoId,criadorId)
    response.json(resp)

  }
}