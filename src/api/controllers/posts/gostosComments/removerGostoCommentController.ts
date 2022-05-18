import { Request, Response } from "express";
import { RemoverGostoCommentService } from "../../../services/posts/gostosComments/removerGostoCommentService";

export class RemoverGostoCommentController{
  async handle(request:Request, response:Response){
    const comentarioId = request.params.comentarioId;
    const publicacaoId = request.params.publicacaoId;
    const criadorId = request.params.userId;

    const removerGostoCommentService = new RemoverGostoCommentService();
    const resp = await removerGostoCommentService.execute(publicacaoId,criadorId,comentarioId)

    response.json(resp.data).status(resp.status);    
  }
}