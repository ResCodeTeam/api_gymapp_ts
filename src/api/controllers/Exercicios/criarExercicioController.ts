/**
 * @module CriarExercicioController
 */
import { Request, Response } from "express";
import { CriarExercicioService } from "../../services/exercicios/criarExercicioService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para criar exercícios
 */

export class CriarExercicioController {
  /**
   * Permite criar exercícios recebendo os dados por body e parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link CriarExercicioService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const autor = request.params.treinadorId;
    const { nome, descricao, isTempo, imagens, musculos } = request.body;

    try{
      if (
        autor === undefined ||
        nome === undefined ||
        descricao === undefined ||
        isTempo === undefined ||
        imagens === undefined ||
        musculos === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const criarExercicioService = new CriarExercicioService();
      const resp = await criarExercicioService.execute({
        nome,
        descricao,
        autor,
        isTempo,
        imagens,
        musculos,
      });
  
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }  
  }
}
