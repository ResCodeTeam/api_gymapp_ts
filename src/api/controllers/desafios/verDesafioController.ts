import { Request, Response } from "express";
import { VerDesafioService } from "../../services/desafios/verDesafioService";

export class VerDesafioController {
  async handle(request: Request, response: Response) {
    const uId = request.params.userId;
    const desafioId = request.params.id;

    try{
      if (uId === undefined || desafioId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verDesafioService = new VerDesafioService();
      const resp = await verDesafioService.execute(uId, desafioId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
