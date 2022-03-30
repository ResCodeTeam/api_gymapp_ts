import { Request, Response } from "express";
import { RemoverMarcaService } from "../../../services/admin/marcas/removerMarcaService";

export class RemoverMarcaController{
    async handle(request : Request, response : Response){
        const marcaId = request.params.id;

        const removerMarcaService = new RemoverMarcaService();
        const resp = await removerMarcaService.execute({marcaId});
        response.json(resp);
      };
}

