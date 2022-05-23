import { Request, Response } from "express";
import { EncerrarDesafiosService } from "../../services/desafios/encerrarDesafiosService";

export class EncerrarDesafiosController {
  async handle(request: Request, response: Response) {
    const uId = request.params.userId;
    const desafioId = request.params.id;
    const { isEncerrado } = request.body;

    try{
      if (
        uId === undefined ||
        desafioId === undefined ||
        isEncerrado === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const encerrarDesafiosService = new EncerrarDesafiosService();
  
      const resp = await encerrarDesafiosService.execute({
        uId,
        isEncerrado,
        desafioId,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
