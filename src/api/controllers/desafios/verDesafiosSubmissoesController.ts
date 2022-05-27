import { Request, Response } from "express";
import { VerDesafiosSubmissoesService } from "../../services/desafios/verDesafiosSubmissoesService";

export class VerDesafiosSubmissoesController {
  async handle(request: Request, response: Response) {
    const uId = request.params.userId;
    const desafioId = request.params.desafioId;

    try{
      if (uId === undefined || desafioId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const encerrarDesafiosSubmissoesService =
        new VerDesafiosSubmissoesService();
      const resp = await encerrarDesafiosSubmissoesService.execute(
        uId,
        desafioId
      );
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
