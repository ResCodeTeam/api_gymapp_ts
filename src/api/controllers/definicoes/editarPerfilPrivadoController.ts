/**
 * @module EditarPerfilPrivadoController
 */
import { Request, Response } from "express";
import { EditarPerfilPrivadoService } from "../../services/definicoes/editarPerfilPrivadoService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para editar o perfil de um utilizador
 */
export class EditarPerfilPrivadoController {
  /**
   * Permite editar o perfil de um utilizador recebendo os dados por body do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link EditarPerfilPrivadoService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uId = request.params.userId;
    const { is_privado } = request.body;

    try{
      if (uId === undefined || is_privado === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const editarPerfilPrivadoController = new EditarPerfilPrivadoService();
      const resp = await editarPerfilPrivadoController.execute(uId, is_privado);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
