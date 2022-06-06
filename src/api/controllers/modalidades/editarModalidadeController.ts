/**
 * @module EditarModalidadesController
 */
import { Request, Response } from "express";
import { EditarModalidadesService } from "../../services/modalidades/editarModalidadeService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para editar modalidades
 */
export class EditarModalidadesController {
  /**
   * Permite editar uma modalidade recebendo os dados por body e parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link EditarModalidadesService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uid = request.params.adminId;
    const modalidadeId = request.params.id;
    const ginasioId = request.params.ginasioId;

    let { imagemUrl, nome } = request.body;

    try{
      if (
        uid === undefined ||
        modalidadeId === undefined ||
        ginasioId === undefined ||
        imagemUrl === undefined ||
        nome === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const editarModalidadesController = new EditarModalidadesService();
      const resp = await editarModalidadesController.execute({
        imagemUrl,
        nome,
        modalidadeId,
        ginasioId,
        uid,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
