import { Request, Response } from "express";
import { VerUmaAvaliacaoService } from "../../services/avaliacoes/verUmaAvaliacaoService";

export class VerUmaAvaliacaoController {
  async handle(request: Request, response: Response) {
    const userId = request.params.alunoId;
    const avaliacaoId = request.params.avaliacaoId;

    try{
      if (avaliacaoId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verUmaAvaliacaoService = new VerUmaAvaliacaoService();
      const resp = await verUmaAvaliacaoService.execute(userId, avaliacaoId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
