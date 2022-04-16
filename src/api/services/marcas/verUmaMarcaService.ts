
import { checkMarcaExists, checkAutorMarca } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

interface IMarca{
    donoId:string,
    marcaId:string   
}


export class VerUmaMarcaService{
    async execute({donoId, marcaId}: IMarca){

        const exists_marca= await checkMarcaExists(marcaId)
        if(!exists_marca){
            throw new Error("A marca não existe")
        }

        const autor_marca = await client.marcas.findUnique({
            where:{
                marca_id:marcaId
            }
          })
        const isAutor = await checkAutorMarca(donoId,marcaId);
          if(!isAutor){
            throw new Error("A marca não lhe pertence");
        }

        const marca = await client.marcas.findMany({
            where:{
                dono_id:donoId,
                isDeleted: false

            }
        })
        return marca;
    }
}