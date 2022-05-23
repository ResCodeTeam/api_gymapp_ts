import { Request, Response } from "express";
import { RemoverGostoPublicacaoService } from "../../../services/posts/gostosPosts/removerGostoService";

export class RemoverGostoPublicacaoController {
  async handle(request: Request, response: Response) {
    const publicacaoId = request.params.id;
    const userId = request.params.userId;

    try{
      if (publicacaoId === undefined || userId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const removerGostoService = new RemoverGostoPublicacaoService();
      const resp = await removerGostoService.execute(publicacaoId, userId);
  
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
