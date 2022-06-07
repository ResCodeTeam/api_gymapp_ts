/**
 * @module VerAgendamentosDesafiosAlunoController
 */
import { Request, Response } from "express";
import { VerAgendamentosDesafiosAlunoService } from "../../../services/agendamentos/aluno/verAgendamentosDesafiosAlunoService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter de os pedidos de agendamentos de desafios
 */
export class VerAgendamentosDesafiosAlunoController {
  /**
   * Permite ver pedidos de desafios recebendo os dados pelos parâmetros do request verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerAgendamentosDesafiosAlunoService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
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
