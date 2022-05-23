import { Request, Response } from "express";
import { AgendarAvaliacaoService } from "../../../services/agendamentos/aluno/agendarAvaliacaoService";


export class AgendarAvaliacaoController {
  async handle(request: Request, response: Response) {
    const uid = request.params.alunoId;
    let { ginasioId, dataAgendamento } = request.body;
    if (uid === undefined || ginasioId === undefined || dataAgendamento === undefined) {
      response.json("Pedido inválido").status(500);
    }

    dataAgendamento = new Date(dataAgendamento)
    const agendarAvaliacaoService = new AgendarAvaliacaoService();
    const resp = await agendarAvaliacaoService.execute({ uid, dataAgendamento, ginasioId });

    response.status(resp.status).json(resp.data);
  }
}
