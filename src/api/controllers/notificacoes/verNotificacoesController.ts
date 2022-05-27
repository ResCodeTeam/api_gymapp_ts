import { Request, Response } from "express";
import { VerNotificacoesService } from "../../services/notificacoes/verNotificacoesService";

export class VerNotificacoesController {
  async handle(request: Request, response: Response) {
    const origemId = request.params.userId;

    try{
      if (origemId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verNotificacoesService = new VerNotificacoesService();
      const resp = await verNotificacoesService.execute(origemId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
