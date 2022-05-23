import { Request, Response } from "express";
import { VerTreinadorGinasioService } from "../../services/ginasios/obterTreinadoresGinasioService";

export class VerTreinadorGinasioController {
  async handle(request: Request, response: Response) {
    const uId = request.params.adminId;
    const marcaId = request.params.id;
    if (uId === undefined || marcaId === undefined) {
      response.status(500).json("Pedido inválido");
    }

    const verTreinadorGinasioService = new VerTreinadorGinasioService();
    const resp = await verTreinadorGinasioService.execute(uId, marcaId);
    response.status(resp.status).json(resp.data);
  }
}
