import { Request, Response } from "express";
import { VerAvaliacoesService } from "../../services/avaliacoes/verAvaliacaoService";

export class VerAvaliacaoTreinadorController {
  async handle(request: Request, response: Response) {
    const alunoId = request.params.alunoId;
    const treinadorId = request.params.treinadorId;

    try{
      if (alunoId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verAvaliacaoService = new VerAvaliacoesService();
      const resp = await verAvaliacaoService.execute(treinadorId, alunoId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
