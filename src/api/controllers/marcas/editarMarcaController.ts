import { Request, Response } from "express";
import { EditarMarcaService } from "../../services/marcas/editarMarcaService";



export class EditarMarcaController{
    
    async handle (request: Request, response: Response){
        const marcaId = request.params.marcaId;
        const adminId=response.locals.uid;
        
        const {
            nome,
            cor,
            logotipo,
            mobilidade,
        }=request.body;

        const  editarMarcaService = new EditarMarcaService();
        console.log(marcaId);
    const resp = await editarMarcaService.execute({
        adminId,
        marcaId,
        nome,
        cor,
        logotipo,
        mobilidade,
        });
    response.json(resp);
    }
}
