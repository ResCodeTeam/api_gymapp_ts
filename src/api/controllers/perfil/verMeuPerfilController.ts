import { Request, Response } from "express";
import { VerMeuPerfilService } from "../../services/perfil/verMeuPerfilService";

export class VerMeuPerfilController {
  async handle(request: Request, response: Response) {
    const uid = request.params.userId;
    if (uid === undefined) {
      response.json("Pedido inválido").status(500);
    }

    const verMeuPerfilService = new VerMeuPerfilService();
    const resp = await verMeuPerfilService.execute(uid);

    response.json(resp.data).status(resp.status);

  }
}