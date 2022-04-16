
import { checkGinasioExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

interface IGinasios{
    ginasioId: string   
}

export class VerTodasModalidadesService{
    async execute({ginasioId}: IGinasios){

        const exists_ginasio = checkGinasioExists(ginasioId)
        if(!exists_ginasio)
        {
            throw new Error ("O ginásio não existe");
        }

        const marcas = await client.modalidades_ginasio.findMany({
            where:{
                ginasio_id: ginasioId,
                isDeleted: false

            }, select:{
                nome:true,
                imagem_url:true,
            }        
         })
        return marcas;
    }
}