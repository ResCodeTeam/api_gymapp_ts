
import { checkMarcaExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

interface IGinasios{
    marcaId:string
    
}

export class VerTodosGinasiosService{
    async execute({marcaId}: IGinasios){
        const exists_ginasios= await checkMarcaExists(marcaId)
        if(!exists_ginasios){
            throw new Error("A marca não existe")
        }

        const ginasios = await client.ginasio.findMany({
            where:{
                marca_id:marcaId

            }, select:{
                nome:true,
                imagem_url:true,
            }        
         })
        return ginasios;
    }
}