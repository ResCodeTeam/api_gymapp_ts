import { Request, Response } from "express";
import { EditarAtividadesService } from "../../services/atividades/editarAtividadesService";


export class EditarAtividadesController {
    async handle(request: Request, response: Response) {
        const atividadeId = request.params.id
        const { descricao, icon } = request.body;
        if (atividadeId === undefined || descricao === undefined || icon === undefined) {
            response.json("Pedido inválido").status(500);
        }

        const editarAtividadesService = new EditarAtividadesService()
        const resp = await editarAtividadesService.execute({ atividadeId, descricao, icon });
        response.status(resp.status).json(resp.data);
    }
}