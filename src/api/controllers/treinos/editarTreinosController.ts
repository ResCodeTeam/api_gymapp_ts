import { Request, Response} from "express";
import { EditarTreinosService } from "../../services//treinos/editarTreinosService";

export class EditarTreinosController{
    async handle(request : Request, response : Response) {
        const uId = request.params.uId;
        const treinoId = request.params.treino_id;
        
        let { atividadeId, modalidadeId, duracao, calorias, distancia, data } = request.body;

        data = new Date(data);
        const editarTreinosService = new EditarTreinosService();
        const resp = await editarTreinosService.execute({
            uId,
            treinoId,
            atividadeId,
            modalidadeId,
            duracao,
            calorias,
            distancia,
            data
        });
        response.json(resp);
    }
}
