import { Request, Response } from "express";
import { RemoverAtividadesService } from "../../services/atividades/removerAtividadesService";

class RemoverAtividadesController{
    async handle(request: Request, response: Response){
        const atividadeId = request.params.id;

    const removerAtividadesService = new RemoverAtividadesService();
    const resp = await removerAtividadesService.execute(atividadeId);
    response.json(resp.data).status(resp.status);
    }
}

export{ RemoverAtividadesController }
