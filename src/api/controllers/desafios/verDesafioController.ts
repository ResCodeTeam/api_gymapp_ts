import { Request, Response } from "express";
import { VerDesafioService } from "../../services/desafios/verDesafioService";


export class VerDesafioController {

    async handle(request: Request, response: Response) {
        const uId = request.params.userId;
        const desafioId = request.params.id;

        if (uId === undefined || desafioId === undefined) {
            response.status(500).json("Pedido inválido");
        }

        const verDesafioService = new VerDesafioService();
        const resp = await verDesafioService.execute(uId, desafioId);
        response.status(resp.status).json(resp.data);
    }
}