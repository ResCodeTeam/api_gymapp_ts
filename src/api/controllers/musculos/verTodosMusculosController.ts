/**
 * @module VerTodosMusculosController
 */
import { Request, Response } from "express";
import { VerTodosMusculosService } from "../../services/musculos/verTodosMusculosService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter todos os músculos
 */
export class VerTodosMusculosController {
    /**
   * Permite obter todos os músculos recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerTodosMusculosService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
    async handle(request: Request, response: Response) {

        const verTodosMusculosService = new VerTodosMusculosService();
        const resp = await verTodosMusculosService.execute();
        response.status(resp.status).json(resp.data);
    }
}