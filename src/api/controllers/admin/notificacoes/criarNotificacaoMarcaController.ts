import { Request, Response } from "express";
import { CriarNotificacaoMarcaService } from "../../../services/admin/notificacoes/criarNotificacaoMarcaService"

export class CriarNotificacaoMarcaController{
    async handle(request:Request,response:Response){
        const postId = request.params.id;
        const {userId, marcaId, conteudo, data, tipo}=request.body;

        const criarNotificacaoMarcarController = new CriarNotificacaoMarcaService();
        const resp = await criarNotificacaoMarcarController.execute({
            userId,
            marcaId,
            conteudo,
            data,
            tipo
        });
        response.json(resp);
    }
}