import { Request, Response } from "express";
import { AgendarDesafiosService } from "../../../services/agendamentos/aluno/agendarDesafiosService";

export class AgendarDesafiosController {
  async handle(request: Request, response: Response) {
    const uid = request.params.alunoId;
    const desafioId = request.params.id;
    let { ginasioId, dataAgendamento } = request.body;
    if (uid === undefined || desafioId === undefined || ginasioId === undefined || dataAgendamento === undefined) {
      response.status(500).json("Pedido inválido");
    }

    dataAgendamento = new Date(dataAgendamento)
    const agendarDesafiosService = new AgendarDesafiosService();
    const resp = await agendarDesafiosService.execute({ uid, dataAgendamento, desafioId, ginasioId });
    response.status(resp.status).json(resp.data);
  }
}
