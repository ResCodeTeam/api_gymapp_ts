/**
 * @module EditarPlanoTreinoController
 */
import { Request, Response } from "express";
import { EditarPlanoTreinoService } from "../../services/plano/editarPlanoTreinoService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para editar planos de treino
 */
export class EditarPlanoTreinoController {
  /**
   * Permite editar um plano de treino recebendo os dados por body e parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link EditarPlanoTreinoService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const treinadorId = request.params.treinadorId;
    const planoId = request.params.id;
    const { alunoId, modalidadeId, blocos } = request.body;

    try{
      if (
        treinadorId === undefined ||
        planoId === undefined ||
        alunoId === undefined ||
        modalidadeId === undefined ||
        blocos === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const data = new Date(Date.now());
      const editarPlanoTreinoService = new EditarPlanoTreinoService();
      const resp = await editarPlanoTreinoService.execute({
        planoId,
        alunoId,
        treinadorId,
        modalidadeId,
        blocos,
        data,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
