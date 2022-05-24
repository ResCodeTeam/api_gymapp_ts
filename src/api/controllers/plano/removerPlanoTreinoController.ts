import { Request, Response } from "express";
import { RemoverPlanoTreinoService } from "../../services/plano/removerPlanoTreinoService";

export class RemoverPlanoTreinoController {
  async handle(request: Request, response: Response) {
    const treinadorId = request.params.treinadorId;
    const planoId = request.params.plano_id;

    try{
      if (treinadorId === undefined || planoId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const removerPlanoTreinoService = new RemoverPlanoTreinoService();
      const resp = await removerPlanoTreinoService.execute(treinadorId, planoId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
