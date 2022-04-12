import { Request, Response} from "express";
import { InscreverDesafiosService } from "../../services/desafios/inscricaoDesafiosService";

export class InscreverDesafiosController{
    async handle(request : Request, response : Response) {
        const agendamentoId = request.params.id;
        const { 
            estado,
        desafioId } = request.body;
        const inscreverDesafiosService = new InscreverDesafiosService();

        const resp = await inscreverDesafiosService.execute({
            agendamentoId,
            estado,
            desafioId
        });
        response.json(resp);
    }
}
