import { Request, Response } from "express";
import { CriarLocalMedidaService } from "../../services/localMedida/criarLocalMedidaService";

export class CriarLocalMedidaController {
  async handle(request: Request, response: Response) {
    const uid = request.params.adminId;
    const marcaId = request.params.marcaId;
    const { descricao, unilado } = request.body;

    try{
      if (
        uid === undefined ||
        marcaId === undefined ||
        descricao === undefined ||
        unilado === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const criarLocalMedidaService = new CriarLocalMedidaService();
      const resp = await criarLocalMedidaService.execute(
        uid,
        marcaId,
        descricao,
        unilado
      );
  
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
