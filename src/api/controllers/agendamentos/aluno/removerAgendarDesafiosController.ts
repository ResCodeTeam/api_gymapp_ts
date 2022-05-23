import { Request, Response } from "express";
import { RemoverAgendarDesafiosService } from "../../../services/agendamentos/aluno/removerAgendarDesafiosService";

class RemoverAgendarDesafiosController {
    async handle(request: Request, response: Response) {
        const agendamentoId = request.params.agendamento_id;
        const uId = request.params.alunoId;
        if (agendamentoId === undefined || uId === undefined) {
            response.json("Pedido inválido").status(500);
        }

        const removerAgendarDesafiosService = new RemoverAgendarDesafiosService();
        const resp = await removerAgendarDesafiosService.execute(agendamentoId, uId);
        response.status(resp.status).json(resp.data);
    }
}

export { RemoverAgendarDesafiosController }