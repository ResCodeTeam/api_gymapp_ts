import { Request, Response } from "express";
import { RemoverTreinosService } from "../../services/treinos/removerTreinosService";

class RemoverTreinosController {
  async handle(request: Request, response: Response) {
    const uId = request.params.alunoId;
    const treinoId = request.params.treino_id;

    try{
      if (uId === undefined || treinoId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const removerTreinosService = new RemoverTreinosService();
      const resp = await removerTreinosService.execute(uId, treinoId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}

export { RemoverTreinosController };
