import { Request, Response } from "express";
import { EditarPerfilService } from "../../../services/all/perfil/editarPerfilService";


export class EditarPerfilController{
    
    async handle (request: Request, response: Response){
        const uId = request.params.id;
        
        let { 
            email,
            nome,
            password,
            dataNasc,
            dataEntrada,
         
            genero,
            pontos,
            descricao,
            estado,
            imagemUrl }=request.body;

        const  editarPerfilController = new EditarPerfilService();
    const resp = await editarPerfilController.execute({
        uId,
        email,
        nome,
        password,
        dataNasc,
        dataEntrada,
  
        genero,
        pontos,
        descricao,
        estado,
        imagemUrl });
    response.json(resp);
    }
}
