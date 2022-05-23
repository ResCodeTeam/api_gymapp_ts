import { Request, Response } from "express";
import { EditarPlanoTreinoRealizadoService } from "../../services/plano/editarPlanoTreinoRealizadoService";


export class EditarPlanoTreinoRealizadoController {
    async handle(request: Request, response: Response) {
        const alunoId = request.params.alunoId;
        const planoId = request.params.plano_id;
        if (alunoId === undefined || planoId === undefined) {
            response.status(500).json("Pedido inválido");
        }

        const editarPlanoTreinoRealizadoService = new EditarPlanoTreinoRealizadoService();
        const resp = await editarPlanoTreinoRealizadoService.execute(alunoId, planoId);
        response.status(resp.status).json(resp.data);
    }
}
