import { Request, Response} from "express";
import { VerTodosTreinosDosAlunosService } from "../../../services/treinador/treinos/verTodosTreinosDosAlunosService";

export class VerTodosTreinosDosAlunosController{
    async handle(request : Request, response : Response) {
        const verTodosTreinosDosAlunosService = new VerTodosTreinosDosAlunosService;

        const resp = await verTodosTreinosDosAlunosService.execute()

        response.json(resp);

    }
}