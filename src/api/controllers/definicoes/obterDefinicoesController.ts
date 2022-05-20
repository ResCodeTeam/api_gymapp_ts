import { Request, Response } from "express";
import { ObterDefinicoesService } from "../../services/definicoes/obterDefinicoesService";

export class ObterDefinicoesController {
  async handle(request: Request, response: Response) {
    const uid = request.params.userId;
    if (uid === undefined) {
      response.json("Pedido inválido").status(500);
    }

    const obterDefinicoesService = new ObterDefinicoesService();

    const resp = await obterDefinicoesService.execute(uid);
    response.json(resp.data).status(resp.status);
    
  }
}