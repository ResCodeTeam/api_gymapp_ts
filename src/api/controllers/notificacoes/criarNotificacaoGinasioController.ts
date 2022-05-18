import { Request, Response } from "express";
import { CriarNotificacaoGinasioService } from "../../services/notificacoes/criarNotificacaoGinasioService";

export class CriarNotificacaoGinasioController{
    async handle(request:Request,response:Response){
        const userId = request.params.adminId;
        const ginasioId = request.params.ginasioId;
        const {conteudo, tipo}=request.body;
        if(conteudo === undefined || tipo === undefined){
            throw new Error("Pedido inválido")
        }

        const criarNotificacaoMarcarController = new CriarNotificacaoGinasioService();
        const resp = await criarNotificacaoMarcarController.execute({
            userId,
            ginasioId,
            conteudo,
            tipo
        });
        response.json(resp.data).status(resp.status);
    }
}