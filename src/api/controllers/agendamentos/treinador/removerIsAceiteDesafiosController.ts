/**
 * @module RemoverIsAceiteDesafiosController
 */
import { Request, Response } from "express";
import { RemoverIsAceiteDesafiosService } from "../../../services/agendamentos/treinador/removerIsAceiteDesafiosService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para remover o estado de um pedido de desafio
 */
class RemoverIsAceiteDesafiosController {
  /**
   * Permite remover o estado de um pedido de desafio recebendo os dados pelos parâmetros do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link RemoverIsAceiteDesafiosService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
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
