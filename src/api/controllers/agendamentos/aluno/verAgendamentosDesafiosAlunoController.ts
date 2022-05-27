import { Request, Response } from "express";
import { VerAgendamentosDesafiosAlunoService } from "../../../services/agendamentos/aluno/verAgendamentosDesafiosAlunoService";

export class VerAgendamentosDesafiosAlunoController {
  async handle(request: Request, response: Response) {
    const uId = request.params.alunoId;

    try{
      if (uId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verAgendamentosDesafiosAlunoService =
        new VerAgendamentosDesafiosAlunoService();
      const resp = await verAgendamentosDesafiosAlunoService.execute(uId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
