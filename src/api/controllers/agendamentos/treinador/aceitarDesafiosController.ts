import { Request, Response } from "express";
import { AceitarDesafiosService } from "../../../services/agendamentos/treinador/aceitarDesafiosService";

export class AceitarDesafiosController {
  async handle(request: Request, response: Response) {
    const treinadorId = request.params.treinadorId;
    const agendamentoId = request.params.id;
    if (treinadorId === undefined || agendamentoId === undefined) {
      response.status(500).json("Pedido inválido");
    }

    const aceitarDesafiosService = new AceitarDesafiosService();
    const resp = await aceitarDesafiosService.execute(
      agendamentoId,
      treinadorId
    );
    response.status(resp.status).json(resp.data);
  }
}
