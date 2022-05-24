import { Request, Response } from "express";
import { RemoverIsAceiteAvaliacoesService } from "../../../services/agendamentos/treinador/removerIsAceiteAvaliacoesService";

class RemoverIsAceiteAvaliacoesController {
  async handle(request: Request, response: Response) {
    const treinadorId = request.params.treinadorId;
    const agendamentoId = request.params.agendamento_id;

    try{
      if (treinadorId === undefined || agendamentoId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const removerIsAceiteAvaliacoesService =
        new RemoverIsAceiteAvaliacoesService();
      const resp = await removerIsAceiteAvaliacoesService.execute(
        treinadorId,
        agendamentoId
      );
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}

export { RemoverIsAceiteAvaliacoesController };
