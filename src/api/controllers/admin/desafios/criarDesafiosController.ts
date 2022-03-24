import { Request, Response } from "express";
const criarDesafiosService from "../../../services/admin/desafios/criarDesafiosService";

class CriarDesafiosController {
    async handle(request: Request, response: Response){
        const ginasio_id = request.params.id;
  const { criador_id, nome, modalidade_id, data_inicio, data_fim, recompensa, estado, descricao, exercicios, regras } = request.body;
  
  const resp = await criarDesafiosService(criador_id, nome, modalidade_id, data_inicio, data_fim, recompensa, estado, ginasio_id, descricao, exercicios, regras );
  response.json(resp);
    }
}

export{ CriarDesafiosController }