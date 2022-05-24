import { Request, Response } from "express";
import { VerDesafiosDisponiveisService } from "../../services/desafios/verDesafiosDisponiveisService";

export class VerDesafiosDisponiveisController {
  async handle(request: Request, response: Response) {
    const uId = request.params.userId;
    const ginasioId = request.params.id;

    try{
      if (uId === undefined || ginasioId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verDesafiosDisponiveisService = new VerDesafiosDisponiveisService();
      const resp = await verDesafiosDisponiveisService.execute({
        uId,
        ginasioId,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
