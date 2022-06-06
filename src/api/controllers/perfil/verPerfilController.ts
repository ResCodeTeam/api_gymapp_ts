/**
 * @module VerPerfilController
 */
import { Request, Response } from "express";
import { VerPerfilService } from "../../services/perfil/verPefilService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para criar obter o perfil de outros utilizadores
 */
export class VerPerfilController {
  /**
   * Permite obter todos o perfil de outros utilizadores recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerPerfilService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uId = request.params.id;
    const auId = request.params.userId;

    try{
      if (uId === undefined || auId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verPerfilService = new VerPerfilService();
  
      const resp = await verPerfilService.execute(uId, auId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
