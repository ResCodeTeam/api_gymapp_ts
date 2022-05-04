import {  checkMarcaExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";



export class VerTreinadorGinasioService{
    async execute(marcaId:string){

        const existsMarca= await checkMarcaExists(marcaId)
        if(!existsMarca){
            throw new Error("A marca não existe")
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