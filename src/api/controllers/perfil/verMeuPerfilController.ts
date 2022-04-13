import { Request, Response } from "express";
import { VerMeuPerfilService } from "../../services/perfil/verMeuPerfilService";

export class VerMeuPerfilController{
  async handle(request:Request ,response:Response){
    const uid=response.locals.uid;

    const verMeuPerfilService = new VerMeuPerfilService();
    const resp = await verMeuPerfilService.execute(uid);
    
    response.json(resp);

  }
}