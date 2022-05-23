import { Request, Response } from "express";
import { RemoverLocalMedidaService } from "../../services/localMedida/removerLocalMedidaService";

export class RemoverLocalMedidaController {
  async handle(request: Request, response: Response) {
    const uid = request.params.adminId;
    const localId = request.params.id;
    const marcaId = request.params.marcaId;

    try{
      if (uid === undefined || localId === undefined || marcaId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const removerLocalMedidaService = new RemoverLocalMedidaService();
      const resp = await removerLocalMedidaService.execute(uid, marcaId, localId);
  
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
