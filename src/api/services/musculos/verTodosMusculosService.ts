
import { client } from "../../prisma/client";

export class VerTodosMusculosService{
    async execute(){

        const musculos = await client.musculos.findMany({
            select:{
                nome:true,
                img_url:true,
            }        
         })
        return musculos;
    }
}