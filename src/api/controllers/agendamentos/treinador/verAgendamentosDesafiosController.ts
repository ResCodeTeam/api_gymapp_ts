/**
 * @module VerAgendamentosDesafiosController
 */
import { Request, Response } from "express";
import { VerAgendamentosDesafiosService } from "../../../services/agendamentos/treinador/verAgendamentosDesafiosService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter o pedidos de agendamentos de desafios
 */
export class VerAgendamentosDesafiosController {
    /**
   * Permite obter os pedidos de agendamento de desafios recebendo os dados pelos parâmetros do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerAgendamentoDesafiosService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
    async handle(request: Request, response: Response) {
        const uid = request.params.treinadorId
        const verAgendamentosDesafiosService = new VerAgendamentosDesafiosService();
        const resp = await verAgendamentosDesafiosService.execute(uid);
        response.status(resp.status).json(resp.data);
    }
}