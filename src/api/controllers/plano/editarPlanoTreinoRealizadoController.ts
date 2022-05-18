import { Request, Response } from "express";
import { EditarPlanoTreinoRealizadoService } from "../../services/plano/editarPlanoTreinoRealizadoService";


export class EditarPlanoTreinoRealizadoController {
    async handle(request: Request, response: Response) {
        const alunoId = request.params.alunoId;
        const planoId = request.params.plano_id;

        const editarPlanoTreinoRealizadoService = new EditarPlanoTreinoRealizadoService();
        const resp = await editarPlanoTreinoRealizadoService.execute(alunoId, planoId);
        response.json(resp);
    }
}
