/**
 * @module AceitarAvaliacoesController
 */
import { Request, Response } from "express";
import { AceitarAvaliacoesService } from "../../../services/agendamentos/treinador/aceitarAvaliacoesService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para ditar o estado de um pedido de avaliação
 */
export class AceitarAvaliacoesController {
  /**
   * Permite editar o estado de um pedido de avaliação recebendo os dados pelos parâmetros do request verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link AceitarAvaliacoesService}
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
  
      const aceitarAvaliacoesService = new AceitarAvaliacoesService();
      const resp = await aceitarAvaliacoesService.execute(
        agendamentoId,
        treinadorId
      );
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
