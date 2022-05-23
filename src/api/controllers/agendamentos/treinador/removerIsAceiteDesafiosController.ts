import { Request, Response } from "express";
import { RemoverIsAceiteDesafiosService } from "../../../services/agendamentos/treinador/removerIsAceiteDesafiosService";

class RemoverIsAceiteDesafiosController {
  async handle(request: Request, response: Response) {
    const treinadorId = request.params.treinadorId;
    const agendamentoId = request.params.agendamento_id;

    try{
      if (treinadorId === undefined || agendamentoId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const removerIsAceiteDesafiosService = new RemoverIsAceiteDesafiosService();
      const resp = await removerIsAceiteDesafiosService.execute(
        treinadorId,
        agendamentoId
      );
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }  
  }
}

export { RemoverIsAceiteDesafiosController };
