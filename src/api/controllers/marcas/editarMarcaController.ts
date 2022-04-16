import { Request, Response } from "express";
import { EditarMarcaService } from "../../services/marcas/editarMarcaService";



export class EditarMarcaController{
    
    async handle (request: Request, response: Response){
        const marcaId = request.params.id;
        
        let {
            nome,
            donoId,
            cor,
            logotipo,
            mobilidade,
            isDeleted
        }=request.body;

        const  editarMarcaController = new EditarMarcaService();
    const resp = await editarMarcaController.execute({ 
        marcaId,
        nome,
        donoId,
        cor,
        logotipo,
        mobilidade,
        isDeleted});
    response.json(resp);
    }
}
