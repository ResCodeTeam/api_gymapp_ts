import { Request, Response } from "express";
import { AceitarAvaliacoesService } from "../../../services/agendamentos/treinador/aceitarAvaliacoesService";


export class AceitarAvaliacoesController {
    async handle(request: Request, response: Response) {
        const treinadorId = request.params.treinadorId;
        const agendamentoId = request.params.id;
        if (treinadorId === undefined || agendamentoId === undefined) {
            response.status(500).json("Pedido inválido");
        }

        const aceitarAvaliacoesService = new AceitarAvaliacoesService()
        const resp = await aceitarAvaliacoesService.execute(agendamentoId, treinadorId);
        response.status(resp.status).json(resp.data);
    }
}