import { Request, Response } from "express";
import { CriarDesafiosService } from "../../services/desafios/criarDesafiosService";

class CriarDesafiosController {
    async handle(request: Request, response: Response){
        const ginasioId = request.params.id;
        let { criadorId, nome, modalidadeId, dataInicio, dataFim, recompensa, descricao, exercicios, regras } = request.body;
        
        dataInicio = new Date(dataInicio);
        dataFim = new Date(dataFim);

        
        
        const criarDesafiosService = new CriarDesafiosService();
        const resp = await criarDesafiosService.execute({criadorId, nome, modalidadeId, dataInicio, dataFim, recompensa, ginasioId, descricao, exercicios, regras });
        response.json(resp);
    }  
}

export { CriarDesafiosController };