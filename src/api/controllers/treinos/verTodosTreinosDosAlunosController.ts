/**
 * @module VerTodosTreinosDosAlunosController
 */
import { Request, Response } from "express";
import { VerTodosTreinosDosAlunosService } from "../../services/treinos/verTodosTreinosDosAlunosService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter os treinos dos alunos
 */
export class VerTodosTreinosDosAlunosController {
    /**
   * Permite obter os treinos dos alunos recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerTodosTreinosDosAlunosService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
    async handle(request: Request, response: Response) {
        const verTodosTreinosDosAlunosService = new VerTodosTreinosDosAlunosService;
        const uid = request.params.treinadorId;
        const resp = await verTodosTreinosDosAlunosService.execute(uid)

        response.status(resp.status).json(resp.data);

    }
}