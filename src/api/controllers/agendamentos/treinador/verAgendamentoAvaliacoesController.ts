import { Request, Response } from "express";
import { VerAgendamentoAvaliacoesService } from "../../../services/agendamentos/treinador/verAgendamentoAvaliacoesService";

export class VerAgendamentoAvaliacoesController {
    async handle(request: Request, response: Response) {

        const verAgendamentoAvaliacoesService = new VerAgendamentoAvaliacoesService();
        const resp = await verAgendamentoAvaliacoesService.execute();
        response.json(resp.data).status(resp.status);
    }
}