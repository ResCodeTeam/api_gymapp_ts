import { Request, Response } from "express";
import { RemoverGostoPublicacaoService } from "../../../services/posts/gostosPosts/removerGostoService";

export class RemoverGostoPublicacaoController {
  async handle(request: Request, response: Response) {
    const publicacaoId = request.params.id;
    const userId = request.params.userId;
    if (publicacaoId === undefined || userId === undefined) {
      response.json("Pedido inválido").status(500);
    }

    const removerGostoService = new RemoverGostoPublicacaoService();
    const resp = await removerGostoService.execute(publicacaoId, userId)

    response.json(resp.data).status(resp.status);
  }
}