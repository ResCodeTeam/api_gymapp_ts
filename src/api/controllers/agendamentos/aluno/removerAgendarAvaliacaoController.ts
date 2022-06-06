/**
 * @module RemoverAgendarAvaliacaoController
 */
import { Request, Response } from "express";
import { RemoverAgendarAvaliacaoService } from "../../../services/agendamentos/aluno/removerAgendarAvaliacaoService";

/**
 * Classe responsável por receber e chamar os métodos do serviço de remoção de um pedido de agendamento de uma avaliação
 */
class RemoverAgendarAvaliacaoController {
  /**
   * Permite remover um pedido de agendamento de uma avaliação recebendo os dados pelos parâmetros do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link RemoverAgendarAvaliacaoService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const agendamentoId = request.params.agendamento_id;
    const uId = request.params.alunoId;
    try{
      if (agendamentoId === undefined || uId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const removerAgendarAvaliacaoService = new RemoverAgendarAvaliacaoService();
      const resp = await removerAgendarAvaliacaoService.execute(
        agendamentoId,
        uId
      );
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    } 
  }
}

export { RemoverAgendarAvaliacaoController };
