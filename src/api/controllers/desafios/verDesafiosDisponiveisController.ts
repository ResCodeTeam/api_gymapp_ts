import { Request, Response } from "express";
import { VerDesafiosDisponiveisService } from "../../services/desafios/verDesafiosDisponiveisService";

export class VerDesafiosDisponiveisController{
    async handle(request:Request,response:Response){
        const uId = response.locals.uid;
        const ginasioId = request.params.id

        const verDesafiosDisponiveisService = new VerDesafiosDisponiveisService();
        const resp = await verDesafiosDisponiveisService.execute({uId, ginasioId});
        response.json(resp)
    }
}