/**
 * @module VerTodasAtividadesController
 */
import { Request, Response } from "express";
import { VerTodasAtividadesService } from "../../services/atividades/verTodasAtividadesService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter atividades
 */
export class VerTodasAtividadesController {
    /**
   * Permite obter atividades recebendo os dados pelo parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerTodasAtividadesService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
    async handle(request: Request, response: Response) {

        const verTodasAtividadesService = new VerTodasAtividadesService();
        const resp = await verTodasAtividadesService.execute();
        response.status(resp.status).json(resp.data);
    }
}