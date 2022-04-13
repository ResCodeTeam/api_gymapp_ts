import { Request, Response } from "express";
import { EditarPerfilPrivadoService } from "../../services/definicoes/editarPerfilPrivadoService";


export class EditarPerfilPrivadoController{
    
    async handle (request: Request, response: Response){
        const uId = request.params.id;
        
        let { isPrivado }=request.body;

        const editarPerfilPrivadoController = new EditarPerfilPrivadoService();
        const resp = await editarPerfilPrivadoController.execute({ uId, isPrivado });
        response.json(resp);
    }
}
