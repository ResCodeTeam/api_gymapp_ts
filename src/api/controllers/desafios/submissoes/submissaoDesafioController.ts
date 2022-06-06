/**
 * @module SubmissaoDesafioController
 */
import { Request, Response } from "express";
import { SubmissaoDesafioService } from "../../../services/desafios/submissoes/submissaoDesafioService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para criar a submissão um desafio
 */
export class SubmissaoDesafioController {
  /**
   * Permite criar a submissão de um desafio recebendo os dados por body e parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link SubmissaoDesafioService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const desafioId = request.params.desafioId;
    const treinadorId = request.params.treinadorId;

    const { uid, valor, ginasioId } = request.body;

    try{
      if (
        desafioId === undefined ||
        uid === undefined ||
        valor === undefined ||
        treinadorId === undefined ||
        ginasioId === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const submissaoDesafioService = new SubmissaoDesafioService();
      const resp = await submissaoDesafioService.execute({
        desafioId,
        uid,
        valor,
        treinadorId,
        ginasioId,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
