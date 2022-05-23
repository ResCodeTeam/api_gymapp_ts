import { Request, Response } from "express";
import { VerAgendamentosAvaliacoesAlunoService } from "../../../services/agendamentos/aluno/verAgendamentosAvaliacoesAlunoService";

export class VerAgendamentosAvaliacoesAlunoController {
  async handle(request: Request, response: Response) {
    const uId = request.params.alunoId;
    if (uId === undefined) {
      response.status(500).json("Pedido inválido");
    }

    const verAgendamentosAvaliacoesAlunoService =
      new VerAgendamentosAvaliacoesAlunoService();
    const resp = await verAgendamentosAvaliacoesAlunoService.execute(uId);
    response.status(resp.status).json(resp.data);
  }
}
