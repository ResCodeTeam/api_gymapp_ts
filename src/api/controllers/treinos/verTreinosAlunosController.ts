import { Request, Response } from "express";
import { VerTreinosAlunosService } from "../../services/treinos/verTreinosAlunosService";

export class VerTreinosAlunosController{
    async handle(request:Request,response:Response){
        const uId = request.params.alunoId;

        const verTreinosAlunosService = new VerTreinosAlunosService();
        const resp = await verTreinosAlunosService.execute(uId);
        response.json(resp.data).status(resp.status);
    }
}