import { Request, Response } from "express";
import { VerTodasMarcasService } from "../../services/marcas/verTodasMarcasService";

export class VerTodasMarcasController {

        async handle(request: Request, response: Response) {
                const donoId = request.params.adminId;
                if (donoId === undefined) {
                        response.status(500).json("Pedido inválido");
                }

                const verTodasMarcasService = new VerTodasMarcasService();
                const resp = await verTodasMarcasService.execute({ donoId });
                response.status(resp.status).json(resp.data);
        }
}