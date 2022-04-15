import { Request, Response } from "express";
import { EditarPerfilPrivadoService } from "../../services/definicoes/editarPerfilPrivadoService";


export class EditarPerfilPrivadoController{
    
    async handle (request: Request, response: Response){
        const uId = response.locals.uid;  
        const { is_privado }=request.body;

        const editarPerfilPrivadoController = new EditarPerfilPrivadoService();
        const resp = await editarPerfilPrivadoController.execute( uId, is_privado );
        response.json(resp);
    }
}
