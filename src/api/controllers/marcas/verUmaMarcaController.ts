import { Request, Response } from "express";
import { VerUmaMarcaService } from "../../services/marcas/verUmaMarcaService";

export class VerUmaMarcaController {

        async handle(request: Request, response: Response) {
                const donoId = request.params.adminId;
                const marcaId = request.params.id;
                if (donoId === undefined || marcaId === undefined) {
                        response.json("Pedido inválido").status(500);
                }

                const verUmaMarcaService = new VerUmaMarcaService();
                const resp = await verUmaMarcaService.execute({ donoId, marcaId });
                response.status(resp.status).json(resp.data);
        }
}