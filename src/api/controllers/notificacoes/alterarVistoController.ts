import { Request, Response } from "express";
import { AlterarVistoService } from "../../services/notificacoes/alterarVistoService";


export class AlterarVistoController{
    async handle(request:Request,response:Response){
        const {notiId,destUid}=request.body;

        const alterarVistoController = new AlterarVistoService();
        const resp = await alterarVistoController.execute({
            notiId,
            destUid
        });
        response.json(resp);
    }
}