/**
 * @module EncerrarDesafiosController
 */
import { Request, Response } from "express";
import { EncerrarDesafiosService } from "../../services/desafios/encerrarDesafiosService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para editar o estado de um desafio
 */
export class EncerrarDesafiosController {
  /**
   * Permite editar o estado de um desafio recebendo os dados por body e parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link EncerrarDesafiosService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uId = request.params.userId;
    const desafioId = request.params.id;
    const { isEncerrado } = request.body;

    try{
      if (
        uId === undefined ||
        desafioId === undefined ||
        isEncerrado === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const encerrarDesafiosService = new EncerrarDesafiosService();
  
      const resp = await encerrarDesafiosService.execute({
        uId,
        isEncerrado,
        desafioId,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
