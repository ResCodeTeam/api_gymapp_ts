import { Request, Response } from "express";
import { CriarNotificacaoGinasioService } from "../../services/notificacoes/criarNotificacaoGinasioService";

export class CriarNotificacaoGinasioController{
    async handle(request:Request,response:Response){
        const userId = response.locals.uid;
        const {ginasioId, conteudo, tipo}=request.body;
        if(ginasioId === undefined || conteudo === undefined || tipo === undefined){
            throw new Error("Pedido inválido")
        }

        const criarNotificacaoMarcarController = new CriarNotificacaoGinasioService();
        const resp = await criarNotificacaoMarcarController.execute({
            userId,
            ginasioId,
            conteudo,
            tipo
        });
        response.json(resp);
    }
}