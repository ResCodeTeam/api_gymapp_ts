/**
 * @module RemoverIsAceiteAvaliacoesController
 */
import { Request, Response } from "express";
import { RemoverIsAceiteAvaliacoesService } from "../../../services/agendamentos/treinador/removerIsAceiteAvaliacoesService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para remover o estado de um pedido de avaliação
 */
class RemoverIsAceiteAvaliacoesController {
  /**
   * Permite remover o estado de um pedido de avaliação recebendo os dados pelos parâmetros do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link RemoverIsAceiteAvaliacoesService}
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
