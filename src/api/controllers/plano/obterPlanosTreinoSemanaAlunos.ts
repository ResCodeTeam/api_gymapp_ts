import { Request, Response } from "express";
import { ObterPlanoTreinoSemanalAlunosService } from "../../services/plano/obterPlanoTreinoSemanalAlunosService";

export class ObterPlanosTreinoSemanaAlunos {
  async handle(request: Request, response: Response) {
    const uid = request.params.treinadorId;
    const startDate = request.params.startDate;
    const endDate = request.params.endDate;
    if (uid === undefined || startDate === undefined || endDate === undefined) {
      response.status(500).json("Pedido inválido");
    }

    const obterPlanosTreinoAlunosService = new ObterPlanoTreinoSemanalAlunosService();
    const resp = await obterPlanosTreinoAlunosService.execute(uid, startDate, endDate);
    response.status(resp.status).json(resp.data);

  }
}