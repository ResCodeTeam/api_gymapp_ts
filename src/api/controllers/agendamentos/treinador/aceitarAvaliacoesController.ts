import { Request, Response } from "express";
import { AceitarAvaliacoesService } from "../../../services/agendamentos/treinador/aceitarAvaliacoesService";


export class AceitarAvaliacoesController {
    async handle(request: Request, response: Response) {
        const treinadorId = request.params.treinadorId;
        const agendamentoId = request.params.id;
        if (treinadorId === undefined || agendamentoId === undefined) {
            response.json("Pedido inválido").status(500);
        }

        const aceitarAvaliacoesService = new AceitarAvaliacoesService()
        const resp = await aceitarAvaliacoesService.execute(agendamentoId, treinadorId);
        response.json(resp.data).status(resp.status);
    }
}