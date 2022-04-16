import { Request, Response } from "express";
import { VerTodosDesafiosService } from "../../services/desafios/verTodosDesafiosService";

export class VerTodosDesafiosController{
    async handle(request:Request,response:Response){
        const donoId = response.locals.uid;
        const ginasioId = request.params.id

        const verTodosDesafiosService = new VerTodosDesafiosService();
        const resp = await verTodosDesafiosService.execute({donoId, ginasioId});
        response.json(resp)
    }
}