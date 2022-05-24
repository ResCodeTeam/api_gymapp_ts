import { Request, Response } from "express";
import { AlterarVistoService } from "../../services/notificacoes/alterarVistoService";

export class AlterarVistoController {
  async handle(request: Request, response: Response) {
    const destUid = request.params.userId;
    const notiId = request.params.id;

    try{
      if (notiId === undefined || destUid === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const alterarVistoController = new AlterarVistoService();
      const resp = await alterarVistoController.execute({
        notiId,
        destUid,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
