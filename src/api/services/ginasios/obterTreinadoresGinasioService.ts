import {  checkMarcaExists, getDonoMarca } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";



export class VerTreinadorGinasioService{
    async execute(uId: string, marcaId:string){
        
        const existsMarca= await checkMarcaExists(marcaId)
        if(!existsMarca){
            throw new Error("A marca não existe")
        }

        const dono_marca = await getDonoMarca(marcaId);
        if(uId != dono_marca){
            throw new Error ("Não possui autorização")
        }
        
        const treinadorMarca = await client.treinadores_marca.findMany({
            where:{
                marca_id:marcaId 
            },select:{
                treinador_uid:true
            }
        })
        return treinadorMarca;
    }
}