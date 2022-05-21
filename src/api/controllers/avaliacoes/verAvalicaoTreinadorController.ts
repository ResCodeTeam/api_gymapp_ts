import { Request, Response } from "express";
import { VerAvaliacoesService } from "../../services/avaliacoes/verAvaliacaoService";

export class VerAvaliacaoTreinadorController {
  async handle(request: Request, response: Response) {
    const alunoId = request.params.alunoId;
    const treinadorId = request.params.treinadorId;
    if (alunoId === undefined) {
      response.json("Pedido inválido").status(500);
    }

    const verAvaliacaoService = new VerAvaliacoesService();
    const resp = await verAvaliacaoService.execute(treinadorId, alunoId);
    response.json(resp.data).status(resp.status);
  }
}