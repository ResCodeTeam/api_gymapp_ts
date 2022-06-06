/**
 * @module EditarGinasioController
 */
import { Request, Response } from "express";
import { EditarGinasioService } from "../../services/ginasios/editarGinasioService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para editar um ginásio
 */
export class EditarGinasioController {
  /**
   * Permite editar um ginásio recebendo os dados por body e parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link EditarGinasioService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const ginasioId = request.params.ginasioId;
    const adminId = request.params.adminId;

    const { nome, rua, descricao, imagemUrl, lat, long } = request.body;

    try{
      if (
        ginasioId === undefined ||
        adminId === undefined ||
        nome === undefined ||
        rua === undefined ||
        descricao === undefined ||
        imagemUrl === undefined ||
        lat === undefined ||
        long === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const editarGinasioService = new EditarGinasioService();
  
      const resp = await editarGinasioService.execute({
        adminId,
        ginasioId,
        nome,
        rua,
        descricao,
        imagemUrl,
        lat,
        long,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
