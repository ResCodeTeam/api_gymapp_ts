import { Request, Response } from "express";
import { VerAvaliacoesService } from "../../services/avaliacoes/verAvaliacaoService";

export class VerAvaliacoesController{
 
    async handle(request:Request,response:Response){
        const alunoId = request.params.alunoId;

        const verAvaliacoesService = new VerAvaliacoesService();
        const resp = await verAvaliacoesService.execute(alunoId);
        response.json(resp.data).status(resp.status);
    }
}