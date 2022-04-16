import { Request, Response} from "express";
import { EditarDesafioService } from "../../services/desafios/editarDesafiosService";


export class EditarDesafioController{
    async handle(request : Request, response : Response) {
        const editarDesafioService = new EditarDesafioService()
        
        const data = {
            nome: request.body.nome,
            data_inicio: new Date(request.body.data_inicio),
            data_fim: new Date(request.body.data_fim),
            recompensa: request.body.recompensa,
            isDeleted: request.body.isDeleted,
            descricao: request.body.descricao,
        }
        if(data.nome === undefined || data.data_inicio === undefined || data.data_fim === undefined || data.recompensa === undefined || data.isDeleted === undefined || data.descricao === undefined){
            throw new Error("Pedido inválido")
          }
        const desafioId = request.params.id;
        
        const resp = await editarDesafioService.execute(data,desafioId)

        response.json(resp);
    }
}
