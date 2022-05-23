import { Request, Response } from "express";
import { EditarPerfilPrivadoService } from "../../services/definicoes/editarPerfilPrivadoService";

export class EditarPerfilPrivadoController {
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
