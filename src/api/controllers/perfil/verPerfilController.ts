import { Request, Response } from "express";
import { VerPerfilService } from "../../services/perfil/verPefilService";

export class VerPerfilController {
  async handle(request: Request, response: Response) {
    const uId = request.params.id;
    const auId = request.params.userId;

    try{
      if (uId === undefined || auId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verPerfilService = new VerPerfilService();
  
      const resp = await verPerfilService.execute(uId, auId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
