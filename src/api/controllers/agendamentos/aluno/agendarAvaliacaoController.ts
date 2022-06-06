/**
 * @module AgendarAvaliacaoController
 */
import { Request, Response } from "express";
import { AgendarAvaliacaoService } from "../../../services/agendamentos/aluno/agendarAvaliacaoService";

/**
 * Classe responsável por receber e chamar os métodos do serviço de criação de um pedido de agendamento de avaliação
 */
export class AgendarAvaliacaoController {
  async handle(request: Request, response: Response) {
      /**
   * Permite criar um pedido de agendamento de uma avaliação recebendo os dados pelo body do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link AgendarAvaliacaoService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
    const uid = request.params.alunoId;
    let { ginasioId, dataAgendamento } = request.body;
    try{
      if (
        uid === undefined ||
        ginasioId === undefined ||
        dataAgendamento === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      dataAgendamento = new Date(dataAgendamento);
      const agendarAvaliacaoService = new AgendarAvaliacaoService();
      const resp = await agendarAvaliacaoService.execute({
        uid,
        dataAgendamento,
        ginasioId,
      });
  
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
