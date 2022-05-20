import { Request, Response } from "express";
import { RemoverIsAceiteDesafiosService } from "../../../services/agendamentos/treinador/removerIsAceiteDesafiosService";

class RemoverIsAceiteDesafiosController {
    async handle(request: Request, response: Response) {
        const treinadorId = request.params.treinadorId;
        const agendamentoId = request.params.agendamento_id;
        if (treinadorId === undefined || agendamentoId === undefined) {
            response.json("Pedido inválido").status(500);
        }

        const removerIsAceiteDesafiosService = new RemoverIsAceiteDesafiosService();
        const resp = await removerIsAceiteDesafiosService.execute(treinadorId, agendamentoId);
        response.json(resp.data).status(resp.status);
    }
}

export { RemoverIsAceiteDesafiosController }