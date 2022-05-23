import { Request, Response } from "express";
import { VerTodosDesafiosService } from "../../services/desafios/verTodosDesafiosService";

export class VerTodosDesafiosController {
  async handle(request: Request, response: Response) {
    const uId = request.params.userId;
    const ginasioId = request.params.id;

    if (uId === undefined || ginasioId === undefined) {
      response.status(500).json("Pedido inválido");
    }

    const verTodosDesafiosService = new VerTodosDesafiosService();
    const resp = await verTodosDesafiosService.execute({ uId, ginasioId });
    response.status(resp.status).json(resp.data);
  }
}
