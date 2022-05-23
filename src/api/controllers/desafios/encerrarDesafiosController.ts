import { Request, Response } from "express";
import { EncerrarDesafiosService } from "../../services/desafios/encerrarDesafiosService";

export class EncerrarDesafiosController {
  async handle(request: Request, response: Response) {
    const uId = request.params.userId;
    const desafioId = request.params.id;
    const { isEncerrado } = request.body;
    if (
      uId === undefined ||
      desafioId === undefined ||
      isEncerrado === undefined
    ) {
      response.status(500).json("Pedido inválido");
    }

    const encerrarDesafiosService = new EncerrarDesafiosService();

    const resp = await encerrarDesafiosService.execute({
      uId,
      isEncerrado,
      desafioId,
    });
    response.status(resp.status).json(resp.data);
  }
}
