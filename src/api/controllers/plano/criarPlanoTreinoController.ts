 import { Request, Response} from "express";
import { CriarPlanoTreinoService } from "../../services/plano/criarPlanoTreinoService";


export class CriarPlanoTreinoController{
    async handle(request : Request, response : Response) {
        const { aluno_id, treinador_id, modalidade_id, blocos } = request.body;
        console.log(request.body)
        const data = new Date(Date.now())
        const criarPlanoTreinoService = new CriarPlanoTreinoService();
        const resp = await criarPlanoTreinoService.execute({  aluno_id, treinador_id, data, modalidade_id, blocos });
        response.json(resp);
    }
}
