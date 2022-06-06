/**
 * @module VerAgendamentosAvaliacoesAlunoController
 */
import { Request, Response } from "express";
import { VerAgendamentosAvaliacoesAlunoService } from "../../../services/agendamentos/aluno/verAgendamentosAvaliacoesAlunoService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter de os pedidos de agendamentos de avaliacoes
 */
export class VerAgendamentosAvaliacoesAlunoController {
  /**
   * Permite ver pedidos de avaliações recebendo os dados pelos parâmetros do request verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerAgendamentosAvaliacoesAlunoService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uId = request.params.alunoId;

    try{
      if (uId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verAgendamentosAvaliacoesAlunoService =
        new VerAgendamentosAvaliacoesAlunoService();
      const resp = await verAgendamentosAvaliacoesAlunoService.execute(uId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
