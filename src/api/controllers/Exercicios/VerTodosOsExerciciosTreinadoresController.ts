/**
 * @module VerTodosOsExerciciosTreinadoresController
 */
import { Request, Response } from "express";
import { VerTodosOsExerciciosTreinadoresService } from "../../services/exercicios/verTodosOsExerciciosTreinadoresService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter todos os exercícios
 */

export class VerTodosOsExerciciosTreinadoresController {
    /**
   * Permite obter todos os exercícios recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerTodosOsExerciciosTreinadoresService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
    async handle(request: Request, response: Response) {
        const verTodosOsExerciciosTreinadoresService = new VerTodosOsExerciciosTreinadoresService();

        const resp = await verTodosOsExerciciosTreinadoresService.execute()

        response.status(resp.status).json(resp.data);

    }
}