import { Request, Response } from "express";
import { ObterDefinicoesService } from "../../services/definicoes/obterDefinicoesService";

export class ObterDefinicoesController {
  async handle(request: Request, response: Response) {
    const uid = request.params.userId;

    try{
      if (uid === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const obterDefinicoesService = new ObterDefinicoesService();
  
      const resp = await obterDefinicoesService.execute(uid);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
