/**
 * @module VerMeuPerfilController
 */
import { Request, Response } from "express";
import { VerMeuPerfilService } from "../../services/perfil/verMeuPerfilService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter o perfil do utilizador autenticado
 */
export class VerMeuPerfilController {
  /**
   * Permite obter o perfil do utilizador autenticado recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerMeuPerfilService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uid = request.params.userId;

    try{
      if (uid === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verMeuPerfilService = new VerMeuPerfilService();
      const resp = await verMeuPerfilService.execute(uid);
  
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
