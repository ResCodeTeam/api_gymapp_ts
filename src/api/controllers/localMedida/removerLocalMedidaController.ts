import { Request, Response } from "express";
import { RemoverLocalMedidaService } from "../../services/localMedida/removerLocalMedidaService";

export class RemoverLocalMedidaController {
  async handle(request: Request, response: Response) {
    const uid = request.params.adminId;
    const localId = request.params.id;
    const marcaId = request.params.marcaId;
    if (uid === undefined || localId === undefined || marcaId === undefined) {
      response.status(500).json("Pedido inválido");
    }

    const removerLocalMedidaService = new RemoverLocalMedidaService();
    const resp = await removerLocalMedidaService.execute(uid, marcaId, localId)

    response.status(resp.status).json(resp.data);
  }
}