import { Request, Response } from "express";
import { VerDesafiosSubmissoesService } from "../../services/desafios/verDesafiosSubmissoesService";

export class VerDesafiosSubmissoesController {
  async handle(request: Request, response: Response) {
    const uId = request.params.userId;
    const desafioId = request.params.desafioId;

    if (uId === undefined || desafioId === undefined) {
      response.status(500).json("Pedido inválido");
    }

    const encerrarDesafiosSubmissoesService =
      new VerDesafiosSubmissoesService();
    const resp = await encerrarDesafiosSubmissoesService.execute(
      uId,
      desafioId
    );
    response.status(resp.status).json(resp.data);
  }
}
