/**
 * @module CriarGinasioModalidadesService
 */
import { Request, Response } from "express";
import { CriarGinasioModalidadesService } from "../../services/modalidades/criarGinasioModalidadesService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para criar modalidades
 */
class CriarGinasioModalidadesController {
  /**
   * Permite criar uma modalidade recebendo os dados por body e parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link CriarGinasioModalidadesService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const ginasioId = request.params.id;
    const adminId = request.params.adminId;

    const { nome, imagemUrl } = request.body;

    try{
      if (
        ginasioId === undefined ||
        adminId === undefined ||
        nome === undefined ||
        imagemUrl === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const criarGinasioModalidadesService = new CriarGinasioModalidadesService();
      const resp = await criarGinasioModalidadesService.execute({
        ginasioId,
        nome,
        imagemUrl,
        adminId,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
export { CriarGinasioModalidadesController };
