/**
 * @module GetTop10Controller
 */
import { Request, Response } from "express";
import { GetTop10Service } from "../../services/marcas/getTop10Service";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter o top 10 dos utilizadores
 */
export class GetTop10Controller {
  /**
   * Permite obter o top 10 dos utilizadores recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link GetTop10Service}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uid = request.params.treinadorId;

    try{
      if (uid === undefined) {
        throw new Error("Pedido inválido");
      }
      const getTop10Service = new GetTop10Service();
      const resp = await getTop10Service.execute(uid);
      response.status(resp.status).json(resp.data); 
    } catch (e) {
      response.status(500).json(e.message)
    } 
  }
}
