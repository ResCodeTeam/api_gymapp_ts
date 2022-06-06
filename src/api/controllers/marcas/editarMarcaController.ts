/**
 * @module EditarMarcaController
 */
import { Request, Response } from "express";
import { EditarMarcaService } from "../../services/marcas/editarMarcaService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para editar uma marca
 */
export class EditarMarcaController {
  /**
   * Permite editar uma marca recebendo os dados por body e parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link EditarMarcaService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const marcaId = request.params.marcaId;
    const adminId = request.params.adminId;

    const { nome, cor, logotipo, mobilidade } = request.body;

    try{
      if (
        marcaId === undefined ||
        adminId === undefined ||
        nome === undefined ||
        cor === undefined ||
        logotipo === undefined ||
        mobilidade === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const editarMarcaService = new EditarMarcaService();
  
      const resp = await editarMarcaService.execute({
        adminId,
        marcaId,
        nome,
        cor,
        logotipo,
        mobilidade,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
