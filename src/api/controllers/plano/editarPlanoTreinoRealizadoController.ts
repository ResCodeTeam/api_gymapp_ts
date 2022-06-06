/**
 * @module EditarPlanoTreinoRealizadoController
 */
import { Request, Response } from "express";
import { EditarPlanoTreinoRealizadoService } from "../../services/plano/editarPlanoTreinoRealizadoService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para editar o estado dos planos de treino
 */
export class EditarPlanoTreinoRealizadoController {
  /**
   * Permite editar o estado de um plano de treino recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link EditarPlanoTreinoRealizadoService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const alunoId = request.params.alunoId;
    const planoId = request.params.plano_id;

    try{
      if (alunoId === undefined || planoId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const editarPlanoTreinoRealizadoService =
        new EditarPlanoTreinoRealizadoService();
      const resp = await editarPlanoTreinoRealizadoService.execute(
        alunoId,
        planoId
      );
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
