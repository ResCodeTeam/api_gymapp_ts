import { Request, Response } from "express";
import { RemoverModalidadesService } from "../../services/modalidades/removerModalidadesService";

class RemoverModalidadesController {
    async handle(request: Request, response: Response) {
        const uid = request.params.adminId;
        const modalidadeId = request.params.id;
        const ginasioId = request.params.ginasioId;
        if (uid === undefined || modalidadeId === undefined || ginasioId === undefined) {
            response.json("Pedido inválido").status(500);
        }

        const removerModalidadesService = new RemoverModalidadesService();
        const resp = await removerModalidadesService.execute(modalidadeId, ginasioId, uid);
        response.json(resp.data).status(resp.status);
    }
}

export { RemoverModalidadesController }
