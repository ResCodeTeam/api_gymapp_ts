import { Request, Response } from "express";
import { VerPerfilService } from "../../services/perfil/verPefilService";



export class VerPerfilController {

    async handle(request: Request, response: Response) {
        const uId = request.params.id;
        const auId = request.params.userId;
        if (uId === undefined || auId === undefined) {
            response.status(500).json("Pedido inválido");
        }

        const verPerfilService = new VerPerfilService();

        const resp = await verPerfilService.execute(uId, auId);
        response.status(resp.status).json(resp.data);
    }
}