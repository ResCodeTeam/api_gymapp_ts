import { Request, Response } from "express";
import { ObterPlanosTreinoAlunosService } from "../../services/plano/obterPlanosTreinoAlunosService";

export class ObterPlanosTreinoAlunos {
  async handle(request: Request, response: Response) {
    const uid = request.params.treinadorId;

    try{
      if (uid === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const obterPlanosTreinoAlunosService = new ObterPlanosTreinoAlunosService();
      const resp = await obterPlanosTreinoAlunosService.execute(uid);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
