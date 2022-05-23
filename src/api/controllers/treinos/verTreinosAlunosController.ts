import { Request, Response } from "express";
import { VerTreinosAlunosService } from "../../services/treinos/verTreinosAlunosService";

export class VerTreinosAlunosController {
    async handle(request: Request, response: Response) {
        const uId = request.params.alunoId;
        if (uId === undefined) {
            response.status(500).json("Pedido inválido");
        }

        const verTreinosAlunosService = new VerTreinosAlunosService();
        const resp = await verTreinosAlunosService.execute(uId);
        response.status(resp.status).json(resp.data);
    }
}