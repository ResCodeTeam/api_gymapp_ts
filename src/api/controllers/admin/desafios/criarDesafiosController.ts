import { Request, Response } from "express";
import { CriarDesafiosService } from "../../../services/admin/desafios/criarDesafiosService";

class CriarDesafiosController {
    async handle(request: Request, response: Response){
        const ginasioId = request.params.id;
        const { criadorId, nome, modalidadeId, dataInicio, dataFim, recompensa, estado, descricao, exercicios, regras } = request.body;
  
        const CriarDesafiosController = new CriarDesafiosService();
        const resp = await CriarDesafiosController.execute({criadorId, nome, modalidadeId, dataInicio, dataFim, recompensa, estado, ginasioId, descricao, exercicios, regras });
        return resp;
    }  
}

export { CriarDesafiosController };