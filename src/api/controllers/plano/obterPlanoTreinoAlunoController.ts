import { Request, Response } from "express";
import { ObterPlanoTreinoSemanalService } from "../../services/plano/obterPlanoTreinoSemanalService";

export class ObterPlanoTreinoAlunoController {
  async handle(request: Request, response: Response) {
    const treinadorId = request.params.treinadorId;
    const uid = request.params.id;
    const startDate = request.params.startDate;
    const endDate = request.params.endDate;
    if (
      treinadorId === undefined ||
      uid === undefined ||
      startDate === undefined ||
      endDate === undefined
    ) {
      response.status(500).json("Pedido inválido");
    }

    const startDateParsed = new Date(startDate);
    const endDateParsed = new Date(endDate);
    const obterPlanoTreinoSemanalService = new ObterPlanoTreinoSemanalService();
    const resp = await obterPlanoTreinoSemanalService.execute(
      uid,
      startDateParsed,
      endDateParsed,
      treinadorId
    );
    response.status(resp.status).json(resp.data);
  }
}
