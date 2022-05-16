import { Request, Response } from "express";
import { RemoverComentarioService } from "../../../services/posts/comments/removerComentarioService";

export class RemoverComentarioController{
  async handle(request:Request, response:Response){
    const criadorId = request.params.userId;
    const comentarioId = request.params.comentarioId;
    const publicacaoId = request.params.publicacaoId;

    const removerComentarioService = new RemoverComentarioService();
    const resp = await removerComentarioService.execute(criadorId,comentarioId,publicacaoId)

    response.json(resp)
  }
}