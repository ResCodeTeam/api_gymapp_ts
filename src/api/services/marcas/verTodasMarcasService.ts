
import { client } from "../../prisma/client";

interface IGinasios{
    donoId: string   
}

export class VerTodasMarcasService{
    async execute({donoId}: IGinasios){

        const marcas = await client.marcas.findMany({
            where:{
                dono_id: donoId,
                isDeleted: false

            }, select:{
                marca_id: true,
                nome:true,
                cor:true,
                logotipo:true,
                mobilidade: true
            }        
         })
        return marcas;
    }
}