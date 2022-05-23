import { Request, Response } from "express";
import { ObterDefinicoesService } from "../../services/definicoes/obterDefinicoesService";

export class ObterDefinicoesController {
  async handle(request: Request, response: Response) {
    const uid = request.params.userId;
    if (uid === undefined) {
      response.status(500).json("Pedido inválido");
    }

    const obterDefinicoesService = new ObterDefinicoesService();

    const resp = await obterDefinicoesService.execute(uid);
    response.status(resp.status).json(resp.data);

  }
}