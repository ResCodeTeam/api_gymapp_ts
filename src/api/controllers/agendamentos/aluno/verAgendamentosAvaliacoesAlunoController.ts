import { Request, Response } from "express";
import { VerAgendamentosAvaliacoesAlunoService } from "../../../services/agendamentos/aluno/verAgendamentosAvaliacoesAlunoService";

export class VerAgendamentosAvaliacoesAlunoController {
    async handle(request: Request, response: Response) {
        const uId = request.params.alunoId;
        if (uId === undefined) {
            response.json("Pedido inválido").status(500);
        }

        const verAgendamentosAvaliacoesAlunoService = new VerAgendamentosAvaliacoesAlunoService();
        const resp = await verAgendamentosAvaliacoesAlunoService.execute(uId);
        response.json(resp.data).status(resp.status);
    }
}