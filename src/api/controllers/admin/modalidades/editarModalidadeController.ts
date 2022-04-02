import { Request, Response } from "express";
import { EditarModalidadesService } from "../../../services/admin/modalidades/editarModalidadeService";


export class EditarModalidadesController{
    
    async handle (request: Request, response: Response){
        const modalidadeId = request.params.id;
        
        let {imagemUrl, nome}=request.body;

        const  editarModalidadesController = new EditarModalidadesService();
    const resp = await editarModalidadesController.execute({imagemUrl,nome,modalidadeId});
    response.json(resp);
    }
}
