/**
 * @module CriarTreinosController
 */
import { Request, Response } from "express";
import { CriarTreinosService } from "../../services/treinos/criarTreinosService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para criar treinos
 */
class CriarTreinosController {
  /**
   * Permite criar treinos recebendo os dados por body e parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link CriarTreinosService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uid = request.params.alunoId;
    let { atividadeId, modalidadeId, duracao, calorias, distancia, data } =
      request.body;

    try{
      if (
        uid === undefined ||
        atividadeId === undefined ||
        modalidadeId === undefined ||
        duracao === undefined ||
        calorias === undefined ||
        distancia === undefined ||
        data === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      data = new Date(data);
      const criarTreinosService = new CriarTreinosService();
      const resp = await criarTreinosService.execute({
        uid,
        atividadeId,
        modalidadeId,
        duracao,
        calorias,
        distancia,
        data,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
export { CriarTreinosController };
