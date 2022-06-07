/**
 * @module AceitarDesafiosController
 */
import { Request, Response } from "express";
import { AceitarDesafiosService } from "../../../services/agendamentos/treinador/aceitarDesafiosService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para editar o estado de um pedido de desafio
 */
export class AceitarDesafiosController {
  /**
   * Permite editar o estado de um pedido de desafio recebendo os dados pelos parâmetros do request verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link AceitarDesafiosService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const treinadorId = request.params.treinadorId;
    const agendamentoId = request.params.id;

    try{
      if (treinadorId === undefined || agendamentoId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const aceitarDesafiosService = new AceitarDesafiosService();
      const resp = await aceitarDesafiosService.execute(
        agendamentoId,
        treinadorId
      );
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
