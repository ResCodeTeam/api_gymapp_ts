// import { Request, Response } from "express";
// import { CriarDesafiosService } from "../../../services/admin/desafios/criarDesafiosService";

// class CriarDesafiosController {
//     async handle(request: Request, response: Response){
//         const ginasioId = request.params.id;
//         const { criadorId, nome, modalidadeId, dataInicio, dataFim, recompensa, estado, descricao, exercicios, regras } = request.body;
//         console.log(criadorId, nome, modalidadeId, dataInicio, dataFim, recompensa, estado, descricao, exercicios, regras)
        
//         const criarDesafiosService = new CriarDesafiosService();
//         const resp = await criarDesafiosService.execute({criadorId, nome, modalidadeId, dataInicio, dataFim, recompensa, estado, ginasioId, descricao, exercicios, regras });
//         response.json(resp);
//     }  
// }

// // export { CriarDesafiosController };