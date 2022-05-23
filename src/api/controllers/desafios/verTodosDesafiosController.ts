import { Request, Response } from "express";
import { VerTodosDesafiosService } from "../../services/desafios/verTodosDesafiosService";

export class VerTodosDesafiosController {
  async handle(request: Request, response: Response) {
    const uId = request.params.userId;
    const ginasioId = request.params.id;

    try{
      if (uId === undefined || ginasioId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verTodosDesafiosService = new VerTodosDesafiosService();
      const resp = await verTodosDesafiosService.execute({ uId, ginasioId });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
