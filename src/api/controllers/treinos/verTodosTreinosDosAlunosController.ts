import { Request, Response } from "express";
import { VerTodosTreinosDosAlunosService } from "../../services/treinos/verTodosTreinosDosAlunosService";

export class VerTodosTreinosDosAlunosController {
    async handle(request: Request, response: Response) {
        const verTodosTreinosDosAlunosService = new VerTodosTreinosDosAlunosService;
        const uid = request.params.treinadorId;
        const resp = await verTodosTreinosDosAlunosService.execute(uid)

        response.json(resp.data).status(resp.status);

    }
}