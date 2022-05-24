import { Request, Response } from "express";
import { CriarGostoService } from "../../../services/posts/gostosPosts/criarGostoService";

export class CriarGostoController {
  async handle(request: Request, response: Response) {
    const postId = request.params.id;
    const criadorId = request.params.userId;

    try{
      if (postId === undefined || criadorId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const criarGostoController = new CriarGostoService();
      const resp = await criarGostoController.execute(postId, criadorId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
