import { Request, Response} from "express";
import { EditarTreinosService } from "../../services//treinos/editarTreinosService";

export class EditarTreinosController{
    async handle(request : Request, response : Response) {
        const uId = request.params.uId;
        const treinoId = request.params.treino_id;
        
        let { atividadeId, modalidadeId, duracao, calorias, distancia } = request.body;

        const data = new Date(Date.now());
        const editarTreinosService = new EditarTreinosService();
        console.log(uId)
        console.log(treinoId)
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
