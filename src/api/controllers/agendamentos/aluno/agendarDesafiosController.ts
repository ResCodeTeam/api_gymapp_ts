/**
 * @module AgendarDesafiosController
 */
import { Request, Response } from "express";
import { AgendarDesafiosService } from "../../../services/agendamentos/aluno/agendarDesafiosService";

/**
 * Classe responsável por receber e chamar os métodos do serviço de criação de um pedido de agendamento de um desafio
 */
export class AgendarDesafiosController {
   /**
   * Permite criar um pedido de agendamento de desafio recebendo os dados pelo body do request verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link AgendarDesafiosService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uid = request.params.alunoId;
    const desafioId = request.params.id;
    let { ginasioId, dataAgendamento } = request.body;
    try{
      if (
        uid === undefined ||
        desafioId === undefined ||
        ginasioId === undefined ||
        dataAgendamento === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      dataAgendamento = new Date(dataAgendamento);
      const agendarDesafiosService = new AgendarDesafiosService();
      const resp = await agendarDesafiosService.execute({
        uid,
        dataAgendamento,
        desafioId,
        ginasioId,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
