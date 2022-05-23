import { Request, Response } from "express";
import { ObterPlanoTreinoSemanalService } from "../../services/plano/obterPlanoTreinoSemanalService";

export class ObterPlanoTreinoSemanalController {
  async handle(request: Request, response: Response) {
    const uid = request.params.alunoId;
    const startDate = request.params.startDate;
    const endDate = request.params.endDate;
    if (uid === undefined || startDate === undefined || endDate === undefined) {
      response.json("Pedido inválido").status(500);
    }

    const startDateParsed = new Date(startDate)
    const endDateParsed = new Date(endDate)

    const obterPlanoTreinoSemanalService = new ObterPlanoTreinoSemanalService();
    const resp = await obterPlanoTreinoSemanalService.execute(uid, startDateParsed, endDateParsed, uid)
    response.status(resp.status).json(resp.data);

  }
}