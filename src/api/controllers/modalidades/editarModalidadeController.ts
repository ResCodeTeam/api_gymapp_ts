import { Request, Response } from "express";
import { EditarModalidadesService } from "../../services/modalidades/editarModalidadeService";


export class EditarModalidadesController{
    
    async handle (request: Request, response: Response){
        const modalidadeId = request.params.id;
        
        let {imagemUrl, nome}=request.body;
        if(imagemUrl === undefined || nome === undefined){
            throw new Error("Pedido inválido")
          }

        const  editarModalidadesController = new EditarModalidadesService();
    const resp = await editarModalidadesController.execute({imagemUrl,nome,modalidadeId});
    response.json(resp);
    }
}
