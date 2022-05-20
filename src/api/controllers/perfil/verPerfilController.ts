import { Request, Response } from "express";
import { VerPerfilService } from "../../services/perfil/verPefilService";



export class VerPerfilController {

    async handle(request: Request, response: Response) {
        const uId = request.params.id;
        const auId = request.params.userId;
        if (uId === undefined || auId === undefined) {
            response.json("Pedido inválido").status(500);
        }

        const verPerfilService = new VerPerfilService();

        const resp = await verPerfilService.execute(uId, auId);
        response.json(resp.data).status(resp.status);
    }
}