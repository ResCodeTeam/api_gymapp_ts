import { Request, Response} from "express";
import { CriarDesafioService } from "../../../services/treinador/desafios/criarDesafioService";

export class CriarDesafioController{
    async handle(request : Request, response : Response) {
        const ginasioId = request.params.id;
        const { criadorId, nome, modalidadeId, dataInicio, dataFim, recompensa, estado, descricao, exercicios, regras } = request.body;
  
        const criarDesafioController = new CriarDesafioService();
        const resp = await criarDesafioController.execute({criadorId, nome, modalidadeId, dataInicio, dataFim, recompensa, estado, ginasioId, descricao, exercicios, regras });
        response.json(resp);

        response.json(resp);

    }
}
