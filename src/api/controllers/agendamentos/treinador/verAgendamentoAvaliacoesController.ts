/**
 * @module VerAgendamentoAvaliacoesController
 */
import { Request, Response } from "express";
import { VerAgendamentoAvaliacoesService } from "../../../services/agendamentos/treinador/verAgendamentoAvaliacoesService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter o pedidos de agendamentos de avaliações
 */
export class VerAgendamentoAvaliacoesController {
    /**
   * Permite obter os pedidos de agendamento de avaliações recebendo os dados pelos parâmetros do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerAgendamentoAvaliacoesService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
    async handle(request: Request, response: Response) {
        const uid = request.params.treinadorId;
        const verAgendamentoAvaliacoesService = new VerAgendamentoAvaliacoesService();
        const resp = await verAgendamentoAvaliacoesService.execute(uid);
        response.status(resp.status).json(resp.data);
    }
}