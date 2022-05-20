import { Request, Response } from "express";
import { VerAvaliacoesService } from "../../services/avaliacoes/verAvaliacaoService";

export class VerAvaliacaoAlunoController {
  async handle(request: Request, response: Response) {
    const alunoId = request.params.alunoId;
    const treinadorId = request.params.treinadorId;
    const verAvaliacaoService = new VerAvaliacoesService();
    const resp = await verAvaliacaoService.execute(alunoId);
    response.json(resp.data).status(resp.status);
  }
}