import { Request, Response } from "express";
import { VerTodasModalidadesService } from "../../services/modalidades/verTodasModalidadesService";

export class VerTodasModalidadesController{
 
    async handle(request:Request,response:Response){
        const ginasioId = request.params.id;
        const userId = response.locals.uid;

        const verTodasModalidadesService = new VerTodasModalidadesService();
        const resp = await verTodasModalidadesService.execute({ginasioId, userId});
        response.json(resp)
    }
}