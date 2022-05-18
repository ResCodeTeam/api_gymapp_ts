import { Request, Response } from "express";
import { VerTodasAtividadesService } from "../../services/atividades/verTodasAtividadesService";

export class VerTodasAtividadesController {
    async handle(request: Request, response: Response) {

        const verTodasAtividadesService = new VerTodasAtividadesService();
        const resp = await verTodasAtividadesService.execute();
        response.json(resp.data).status(resp.status);
    }
}