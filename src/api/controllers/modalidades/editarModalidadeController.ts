import { Request, Response } from "express";
import { EditarModalidadesService } from "../../services/modalidades/editarModalidadeService";


export class EditarModalidadesController{
    
    async handle (request: Request, response: Response){
        const uid = response.locals.uid;
        const modalidadeId = request.params.id;
        const ginasioId = request.params.ginasioId;
        
        let {imagemUrl, nome}=request.body;
        if(imagemUrl === undefined || nome === undefined){
            throw new Error("Pedido inválido")
          }

        const  editarModalidadesController = new EditarModalidadesService();
    const resp = await editarModalidadesController.execute({imagemUrl,nome,modalidadeId, ginasioId, uid});
    response.json(resp);
    }
}
