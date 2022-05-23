import { Request, Response } from "express";
import { VerMeuPerfilService } from "../../services/perfil/verMeuPerfilService";

export class VerMeuPerfilController {
  async handle(request: Request, response: Response) {
    const uid = request.params.userId;

    try{
      if (uid === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verMeuPerfilService = new VerMeuPerfilService();
      const resp = await verMeuPerfilService.execute(uid);
  
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
