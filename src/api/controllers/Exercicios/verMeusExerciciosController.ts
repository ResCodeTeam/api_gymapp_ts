import { Request, Response } from "express";
import { VerMeusExerciciosService } from "../../services/exercicios/verMeusExerciciosService";



export class VerMeusExerciciosController{
 
    async handle(request:Request,response:Response){
        const autorId = response.locals.uid;

        const verMeusExerciciosService = new VerMeusExerciciosService();
        const resp = await verMeusExerciciosService.execute({autorId});
        response.json(resp)
    }
}