import { Request, Response } from "express";
import { VerNotificacoesService } from "../../services/notificacoes/verNotificacoesService";

export class VerNotificacoesController {
    async handle(request: Request, response: Response) {
        const origemId = request.params.userId;
        if (origemId === undefined) {
            response.json("Pedido inválido").status(500);
        }

        const verNotificacoesService = new VerNotificacoesService();
        const resp = await verNotificacoesService.execute(origemId);
        response.status(resp.status).json(resp.data);
    }
}