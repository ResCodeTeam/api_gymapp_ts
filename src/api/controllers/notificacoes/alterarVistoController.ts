import { Request, Response } from "express";
import { AlterarVistoService } from "../../services/notificacoes/alterarVistoService";


export class AlterarVistoController {
    async handle(request: Request, response: Response) {
        const destUid = request.params.userId;
        const notiId = request.params.id;
        if (notiId === undefined || destUid === undefined) {
            response.status(500).json("Pedido inválido");
        }

        const alterarVistoController = new AlterarVistoService();
        const resp = await alterarVistoController.execute({
            notiId,
            destUid
        });
        response.status(resp.status).json(resp.data);
    }
}