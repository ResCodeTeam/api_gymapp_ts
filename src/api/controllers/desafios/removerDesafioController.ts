/**
 * @module RemoverDesafioController
 */
import { Request, Response } from "express";
import { RemoverDesafioService } from "../../services/desafios/removerDesafioService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para remover um desafio
 */
export class RemoverDesafioController {
  /**
   * Permite remover um desafio recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link RemoverDesafioService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    //Pedir Id do desafio por parametro
    const desafioId = request.params.id;
    const uId = request.params.userId;

    try{
      if (uId === undefined || desafioId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      //Serviço
      const removerDesafioService = new RemoverDesafioService();
      //Invocar Função
      const resp = await removerDesafioService.execute(desafioId, uId);
  
      //Responder
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
