import { Request, Response } from "express";
import { VerExerciciosBlocoService } from "../../services/exercicios/verExerciciosblocoService";


export class VerExerciciosController{
 
    async handle(request:Request,response:Response){
        const exercicioBlocoId = request.params.id;

        const verExerciciosBlocoService = new VerExerciciosBlocoService();
        const resp = await verExerciciosBlocoService.execute(exercicioBlocoId);
        response.json(resp)
    }
}