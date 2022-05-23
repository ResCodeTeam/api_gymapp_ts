import { Request, Response } from "express";
import { ObterPlanoTreinoSemanalAlunosService } from "../../services/plano/obterPlanoTreinoSemanalAlunosService";

export class ObterPlanosTreinoSemanaAlunos {
  async handle(request: Request, response: Response) {
    const uid = request.params.treinadorId;
    const startDate = request.params.startDate;
    const endDate = request.params.endDate;

    try{
      if (uid === undefined || startDate === undefined || endDate === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const obterPlanosTreinoAlunosService =
        new ObterPlanoTreinoSemanalAlunosService();
      const resp = await obterPlanosTreinoAlunosService.execute(
        uid,
        startDate,
        endDate
      );
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
