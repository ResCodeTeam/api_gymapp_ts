import { Request, Response } from "express";
import { RemoverAgendarAvaliacaoService } from "../../../services/agendamentos/aluno/removerAgendarAvaliacaoService";

class RemoverAgendarAvaliacaoController {
  async handle(request: Request, response: Response) {
    const agendamentoId = request.params.agendamento_id;
    const uId = request.params.alunoId;
    if (agendamentoId === undefined || uId === undefined) {
      response.status(500).json("Pedido inválido");
    }

    const removerAgendarAvaliacaoService = new RemoverAgendarAvaliacaoService();
    const resp = await removerAgendarAvaliacaoService.execute(
      agendamentoId,
      uId
    );
    response.status(resp.status).json(resp.data);
  }
}

export { RemoverAgendarAvaliacaoController };
