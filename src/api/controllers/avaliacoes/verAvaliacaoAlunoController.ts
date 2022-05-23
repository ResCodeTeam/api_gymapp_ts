import { Request, Response } from "express";
import { VerAvaliacoesService } from "../../services/avaliacoes/verAvaliacaoService";

export class VerAvaliacaoAlunoController {
  async handle(request: Request, response: Response) {
    const userId = request.params.userId
    const alunoId = request.params.alunoId;
    if (alunoId === undefined) {
      response.json("Pedido inválido").status(500);
    }

    const verAvaliacaoService = new VerAvaliacoesService();
    const resp = await verAvaliacaoService.execute(userId, alunoId);
    response.status(resp.status).json(resp.data);
  }
}