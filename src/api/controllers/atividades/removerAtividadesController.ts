import { Request, Response } from "express";
import { RemoverAtividadesService } from "../../services/atividades/removerAtividadesService";

class RemoverAtividadesController {
    async handle(request: Request, response: Response) {
        const atividadeId = request.params.id;
        if (atividadeId === undefined) {
            response.status(500).json("Pedido inválido");
        }

        const removerAtividadesService = new RemoverAtividadesService();
        const resp = await removerAtividadesService.execute(atividadeId);
        response.status(resp.status).json(resp.data);
    }
}

export { RemoverAtividadesController }
