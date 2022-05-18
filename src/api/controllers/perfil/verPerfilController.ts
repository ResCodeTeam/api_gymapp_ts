import { Request, Response } from "express";
import { VerPerfilService } from "../../services/perfil/verPefilService";



export class VerPerfilController {

    async handle(request: Request, response: Response) {
        const uId = request.params.id;
        const auId = request.params.userId;

        const verPerfilService = new VerPerfilService();

        const resp = await verPerfilService.execute(uId, auId);
        response.json(resp)
    }
}