import { Request, Response } from "express";
import { RemoverAtividadesService } from "../../services/atividades/removerAtividadesService";

class RemoverAtividadesController {
  async handle(request: Request, response: Response) {
    const atividadeId = request.params.id;

    try{
      if (atividadeId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const removerAtividadesService = new RemoverAtividadesService();
      const resp = await removerAtividadesService.execute(atividadeId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}

export { RemoverAtividadesController };
