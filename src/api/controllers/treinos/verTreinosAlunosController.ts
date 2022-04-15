import { Request, Response } from "express";
import { VerTreinosAlunosService } from "../../services/treinos/verTreinosAlunosService";

export class VerTreinosAlunosController{
    async handle(request:Request,response:Response){
        const uId = response.locals.uid;

        const verTreinosAlunosService = new VerTreinosAlunosService();
        const resp = await verTreinosAlunosService.execute(uId);
        response.json(resp)
    }
}