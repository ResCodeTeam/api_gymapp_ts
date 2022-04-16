import { Request, Response } from "express";
import { VerDesafiosDisponiveisService } from "../../services/desafios/verDesafiosDisponiveisService";

export class VerDesafiosDisponiveisController{
    async handle(request:Request,response:Response){
        const ginasioId = request.params.id

        const verDesafiosDisponiveisService = new VerDesafiosDisponiveisService();
        const resp = await verDesafiosDisponiveisService.execute({ginasioId});
        response.json(resp)
    }
}