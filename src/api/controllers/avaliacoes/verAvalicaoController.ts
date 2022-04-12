import { Request, Response } from "express";
import { VerAvaliacoesService } from "../../services/avaliacoes/verAvaliacaoService";





export class VerAvaliacoesController{
    static handle(arg0: string, handle: any) {
        throw new Error("Method not implemented.");
    }
    async handle(request:Request,response:Response){
        const alunoId = request.params.id;

        const verAvaliacoesService = new VerAvaliacoesService();
        const resp = await verAvaliacoesService.execute(alunoId);
        response.json(resp)
    }
}