import { Request, Response } from "express";
import { EditarAtividadesService } from "../../services/atividades/editarAtividadesService";


export class EditarAtividadesController {
    async handle(request: Request, response: Response) {
        const atividadeId = request.params.id
        const {descricao, icon}= request.body;
        
        const editarAtividadesService = new EditarAtividadesService()
        const resp = await editarAtividadesService.execute({atividadeId, descricao, icon});
        response.json(resp)
    }
}