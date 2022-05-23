import { Request, Response } from "express";
import { VerUmGinasioService } from "../../services/ginasios/verUmGinasioService";



export class VerUmGinasioController {

    async handle(request: Request, response: Response) {
        const donoId = request.params.adminId;
        const ginasioId = request.params.id;
        if (donoId === undefined || ginasioId === undefined) {
            response.status(500).json("Pedido inválido");
        }

        const verUmGinasioService = new VerUmGinasioService();
        const resp = await verUmGinasioService.execute(donoId, ginasioId);
        response.status(resp.status).json(resp.data);
    }
}