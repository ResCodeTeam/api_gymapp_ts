/**
 * @module RemoverSubmissaoDesafioController
 */
import { Request, Response } from "express";
import { RemoverSubmissaoDesafioService } from "../../../services/desafios/submissoes/removerSubmissaoDesafioService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para remover a submissão de um desafio
 */
export class RemoverSubmissaoDesafioController {
  /**
   * Permite obter a submissão de um desafio recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link RemoverSubmissaoDesafioService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uid = request.params.treinadorId;
    const submissaoId = request.params.id;
    const desafioId = request.params.desafioId;

    try{
      if (
        uid === undefined ||
        submissaoId === undefined ||
        desafioId === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const removerSubmissaoDesafioService = new RemoverSubmissaoDesafioService();
      const resp = await removerSubmissaoDesafioService.execute(
        uid,
        submissaoId,
        desafioId
      );
  
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
