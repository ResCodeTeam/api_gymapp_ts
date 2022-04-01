 import { Request, Response} from "express";
import { CriarPlanoTreinoService } from "../../../services/treinador/plano/criarPlanoTreinoService";

export class CriarPlanoTreinoController{
    async handle(request : Request, response : Response) {
        const plano_treino_id = request.params.id;
        const { aluno_id, treinador_id, data, modalidade_id,bloco } = request.body;

        const criarPlanoTreinoService = new CriarPlanoTreinoService();
        const resp = await criarPlanoTreinoService.execute({ plano_treino_id, aluno_id, treinador_id, data, modalidade_id, bloco });
        response.json(resp);
    }
}
