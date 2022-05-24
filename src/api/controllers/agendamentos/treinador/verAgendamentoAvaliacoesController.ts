import { Request, Response } from "express";
import { VerAgendamentoAvaliacoesService } from "../../../services/agendamentos/treinador/verAgendamentoAvaliacoesService";

export class VerAgendamentoAvaliacoesController {
    async handle(request: Request, response: Response) {
        const uid = request.params.treinadorId;
        const verAgendamentoAvaliacoesService = new VerAgendamentoAvaliacoesService();
        const resp = await verAgendamentoAvaliacoesService.execute(uid);
        response.status(resp.status).json(resp.data);
    }
}