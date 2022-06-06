/**
 * @module ObterAlunosGinasioController
 */
import { Request, Response } from "express";
import { ObterAlunosGinasioService } from "../../services/alunos/obterAlunosGinasioService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter os alunos de um ginásio
 */
export class ObterAlunosGinasioController {
    /**
   * Permite obter os alunos de um ginásio recebendo os dados pelos parâmetros do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link ObterAlunosGinasioService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
    async handle(request: Request, response: Response) {
        const ginasioId = request.params.id;
        const userId = request.params.userId;

        try{
            if (userId === undefined || ginasioId === undefined) {
                throw new Error("Pedido inválido")
            }
    
            const obterAlunosGinasioController = new ObterAlunosGinasioService();
            const message = await obterAlunosGinasioController.execute({
                ginasioId,
                userId
            });
    
            response.json(message.data).status(message.status);
        } catch (e) {
            response.status(500).json(e.message)
        }
    }
}