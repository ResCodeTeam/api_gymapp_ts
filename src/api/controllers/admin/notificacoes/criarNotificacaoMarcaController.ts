import { Request, Response } from "express";
import { CriarNotificacaoMarcaService } from "../../../services/admin/notificacoes/criarNotificacaoMarcaService"

export class CriarNotificacaoMarcaController{
    async handle(request:Request,response:Response){
        let {userId, marcaId, conteudo, tipo}=request.body;

        const criarNotificacaoMarcarController = new CriarNotificacaoMarcaService();
        const resp = await criarNotificacaoMarcarController.execute({
            userId,
            marcaId,
            conteudo,
            tipo
        });
        response.json(resp);
    }
}