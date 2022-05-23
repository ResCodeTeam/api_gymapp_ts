import { Request, Response } from "express";
import { EditarModalidadesService } from "../../services/modalidades/editarModalidadeService";

export class EditarModalidadesController {
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
