import { Request, Response } from "express";
import { EditarAtividadesService } from "../../services/atividades/editarAtividadesService";

export class EditarAtividadesController {
  async handle(request: Request, response: Response) {
    const atividadeId = request.params.id;
    const { descricao, icon } = request.body;

    try{
      if (
        atividadeId === undefined ||
        descricao === undefined ||
        icon === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const editarAtividadesService = new EditarAtividadesService();
      const resp = await editarAtividadesService.execute({
        atividadeId,
        descricao,
        icon,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
