import { Request, Response} from "express";
import { EditarTreinosService } from "../../services//treinos/editarTreinosService";

export class EditarTreinosController{
    async handle(request : Request, response : Response) {
        const uId = response.locals.uid;
        const treinoId = request.params.treino_id;
        
        let { atividadeId, modalidadeId, duracao, calorias, distancia } = request.body;
        if(atividadeId === undefined || modalidadeId === undefined || duracao === undefined || calorias === undefined || distancia === undefined){
            throw new Error("Pedido inválido")
        }

        const data = new Date(Date.now());
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
