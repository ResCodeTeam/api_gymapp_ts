import { Request, Response } from "express";
import { VerAgendamentosDesafiosAlunoService } from "../../../services/agendamentos/aluno/verAgendamentosDesafiosAlunoService";

export class VerAgendamentosDesafiosAlunoController {
    async handle(request: Request, response: Response) {
        const uId = request.params.alunoId;
        if (uId === undefined) {
            response.status(500).json("Pedido inválido");
        }

        const verAgendamentosDesafiosAlunoService = new VerAgendamentosDesafiosAlunoService();
        const resp = await verAgendamentosDesafiosAlunoService.execute(uId);
        response.status(resp.status).json(resp.data);
    }
}