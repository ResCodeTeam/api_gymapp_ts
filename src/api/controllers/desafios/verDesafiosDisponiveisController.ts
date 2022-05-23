import { Request, Response } from "express";
import { VerDesafiosDisponiveisService } from "../../services/desafios/verDesafiosDisponiveisService";

export class VerDesafiosDisponiveisController {
    async handle(request: Request, response: Response) {
        const uId = request.params.userId;
        const ginasioId = request.params.id;

        if (uId === undefined || ginasioId === undefined) {
            response.status(500).json("Pedido inválido");
        }

        const verDesafiosDisponiveisService = new VerDesafiosDisponiveisService();
        const resp = await verDesafiosDisponiveisService.execute({ uId, ginasioId });
        response.status(resp.status).json(resp.data);
    }
}