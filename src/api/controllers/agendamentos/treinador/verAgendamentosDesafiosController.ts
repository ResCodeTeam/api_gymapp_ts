import { Request, Response } from "express";
import { VerAgendamentosDesafiosService } from "../../../services/agendamentos/treinador/verAgendamentosDesafiosService";

export class VerAgendamentosDesafiosController {
    async handle(request: Request, response: Response) {
        const uid = request.params.treinadorId
        const verAgendamentosDesafiosService = new VerAgendamentosDesafiosService();
        const resp = await verAgendamentosDesafiosService.execute(uid);
        response.json(resp.data).status(resp.status);
    }
}