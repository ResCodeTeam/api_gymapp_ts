import { Request, Response } from "express";
import { VerTodosGinasiosService } from "../../services/ginasios/verTodosGinasiosService";

export class VerTodosGinasiosController {

        async handle(request: Request, response: Response) {
                const marcaId = request.params.id;
                const userId = request.params.adminId;
                if (userId === undefined || marcaId === undefined) {
                        response.json("Pedido inválido").status(500);
                }

                const verTodosGinasiosService = new VerTodosGinasiosService();
                const resp = await verTodosGinasiosService.execute({ marcaId, userId });
                response.json(resp.data).status(resp.status);
        }
}