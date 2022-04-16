import { checkGinasioExists, checkUserIdExists } from "../../helpers/dbHelpers";
import{client}from "../../prisma/client";

interface IEditarGinasio{
    ginasioId:string,
    nome:string,
    rua:string,
    descricao:string,
    imagemUrl:string,
    lat:string,
    long:string,
    adminId:string
}

export class EditarGinasioService{
    async execute({ginasioId,adminId,nome,rua,descricao,imagemUrl,lat,long}:IEditarGinasio){
        const existsGinasio= await checkGinasioExists(ginasioId)
        if(!existsGinasio)
        {
            throw new Error("Ginasio não existe")
        }
        const existsAdmin= await checkUserIdExists(adminId)
        if(!existsAdmin)
        {
            throw new Error("Utilizador não existe")
        }

        const EditarGinasio=await client.ginasio.update({
            where:{
                ginasio_id:ginasioId
            },
            data:{
                nome:nome,
                rua:rua,
                desricao:descricao,
                imagem_url:imagemUrl,
                lat:lat,
                long:long

            }
        })
    }
}