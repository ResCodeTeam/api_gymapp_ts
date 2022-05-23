import { Request, Response } from "express";
import { VerTodasModalidadesService } from "../../services/modalidades/verTodasModalidadesService";

export class VerTodasModalidadesController {

        async handle(request: Request, response: Response) {
                const ginasioId = request.params.id;
                const userId = request.params.adminId;
                if (ginasioId === undefined || userId === undefined) {
                        response.status(500).json("Pedido inválido");
                }

                const verTodasModalidadesService = new VerTodasModalidadesService();
                const resp = await verTodasModalidadesService.execute({ ginasioId, userId });
                response.status(resp.status).json(resp.data);
        }
}