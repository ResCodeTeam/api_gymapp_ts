import { Request, Response } from "express";
import { EditarExercicioService } from "../../services/exercicios/editarExercicioService";


export class EditarExercicioController {
    async handle(request: Request, response: Response) {
        //Declarar Serviço
        const exercicioId = request.params.exercicios_id
        const autorId = response.locals.uid;
        const {nome, descricao, isTempo}= request.body;
        
        const editarExercicioService = new EditarExercicioService()
        const resp = await editarExercicioService.execute({exercicioId, autorId, nome, descricao, isTempo});
        response.json(resp)
    }
}