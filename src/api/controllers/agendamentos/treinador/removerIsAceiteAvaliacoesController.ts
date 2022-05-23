import { Request, Response } from "express";
import { RemoverIsAceiteAvaliacoesService } from "../../../services/agendamentos/treinador/removerIsAceiteAvaliacoesService";

class RemoverIsAceiteAvaliacoesController {
    async handle(request: Request, response: Response) {
        const treinadorId = request.params.treinadorId;
        const agendamentoId = request.params.agendamento_id;
        if (treinadorId === undefined || agendamentoId === undefined) {
            response.json("Pedido inválido").status(500);
        }

        const removerIsAceiteAvaliacoesService = new RemoverIsAceiteAvaliacoesService();
        const resp = await removerIsAceiteAvaliacoesService.execute(treinadorId, agendamentoId);
        response.status(resp.status).json(resp.data);
    }
}

export { RemoverIsAceiteAvaliacoesController }