import { Request, Response } from "express";
import { AceitarAvaliacoesService } from "../../../services/agendamentos/treinador/aceitarAvaliacoesService";


export class AceitarAvaliacoesController {
    async handle(request: Request, response: Response) {
        const agendamentoId = request.params.id
                
        const aceitarAvaliacoesService = new AceitarAvaliacoesService()
        const resp = await aceitarAvaliacoesService.execute(agendamentoId);
        response.json(resp)
    }
}