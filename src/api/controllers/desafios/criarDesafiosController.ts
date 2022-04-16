import { Request, Response } from "express";
import { CriarDesafiosService } from "../../services/desafios/criarDesafiosService";

class CriarDesafiosController {
    async handle(request: Request, response: Response){
        const criadorId = response.locals.uid
        const ginasioId = request.params.id;
        let { nome, modalidadeId, dataInicio, dataFim, recompensa, descricao, exercicios, regras } = request.body;
        if(nome === undefined || modalidadeId === undefined || dataInicio === undefined || dataFim === undefined || recompensa === undefined || descricao === undefined || exercicios === undefined || regras === undefined){
            throw new Error("Pedido inválido")
        }

        dataInicio = new Date(dataInicio);
        dataFim = new Date(dataFim);
  
        const criarDesafiosService = new CriarDesafiosService();
        const resp = await criarDesafiosService.execute({criadorId, nome, modalidadeId, dataInicio, dataFim, recompensa, ginasioId, descricao, exercicios, regras });
        response.json(resp);
    }  
}

export { CriarDesafiosController };