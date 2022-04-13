import { Request, Response } from "express";
import { AceitarDesafiosService } from "../../../services/agendamentos/treinador/aceitarDesafiosService";


export class AceitarDesafiosController {
    async handle(request: Request, response: Response) {
        const agendamentoId = request.params.id
                
        const aceitarDesafiosService = new AceitarDesafiosService()
        const resp = await aceitarDesafiosService.execute(agendamentoId);
        response.json(resp)
    }
}