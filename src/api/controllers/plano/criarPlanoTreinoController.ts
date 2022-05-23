import { Request, Response } from "express";
import { CriarPlanoTreinoService } from "../../services/plano/criarPlanoTreinoService";

export class CriarPlanoTreinoController {
  async handle(request: Request, response: Response) {
    const treinadorId = request.params.treinadorId;

    const { alunoId, modalidadeId, blocos } = request.body;

    try{
      if (
        alunoId === undefined ||
        modalidadeId === undefined ||
        treinadorId === undefined ||
        blocos === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const data = new Date(Date.now());
      const criarPlanoTreinoService = new CriarPlanoTreinoService();
      const resp = await criarPlanoTreinoService.execute({
        alunoId,
        treinadorId,
        data,
        modalidadeId,
        blocos,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
