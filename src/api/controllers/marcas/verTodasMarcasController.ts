import { Request, Response } from "express";
import { VerTodasMarcasService } from "../../services/marcas/verTodasMarcasService";

export class VerTodasMarcasController {

        async handle(request: Request, response: Response) {
                const donoId = request.params.adminId;
                if (donoId === undefined) {
                        response.json("Pedido inválido").status(500);
                }

                const verTodasMarcasService = new VerTodasMarcasService();
                const resp = await verTodasMarcasService.execute({ donoId });
                response.json(resp.data).status(resp.status);
        }
}