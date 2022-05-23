import { Request, Response } from "express";
import { VerMeuPerfilService } from "../../services/perfil/verMeuPerfilService";

export class VerMeuPerfilController {
  async handle(request: Request, response: Response) {
    const uid = request.params.userId;
    if (uid === undefined) {
      response.status(500).json("Pedido inválido");
    }

    const verMeuPerfilService = new VerMeuPerfilService();
    const resp = await verMeuPerfilService.execute(uid);

    response.status(resp.status).json(resp.data);
  }
}
