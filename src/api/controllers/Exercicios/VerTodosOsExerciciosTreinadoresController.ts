import { Request, Response} from "express";
import { VerTodosOsExerciciosTreinadoresService } from "../../services/exercicios/verTodosOsExerciciosTreinadoresService";

export class VerTodosOsExerciciosTreinadoresController{
    async handle(request : Request, response : Response) {
        const verTodosOsExerciciosTreinadoresService = new VerTodosOsExerciciosTreinadoresService();

        const resp = await verTodosOsExerciciosTreinadoresService.execute()

        response.json(resp.data).status(resp.status);

    }
}