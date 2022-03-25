import { client } from "../../../prisma/client";
//import desafios from "../../../models/desafios";
//import modalidadesGinasio from "../desafios/";


export class RemoverDesafiosService{
    async execute(desafioId: string){


        //apagar o criador dos desafios
        const desafio = await client.desafios.findMany({
            where: {
                desafio_id: desafioId
                
            }
        })

        if(desafio.length=0){
            throw new Error("Desafio não existe")
        }
        
        //apagar desafio de agendamentos
        
        
        await client.agendamentos_desafios.deleteMany({
             where:{
                desafio_id:desafioId

                 }
                }) 
        //apagar desafio na submissao desafios
        
        await client.submissoes_desafios.deleteMany({
            where:{
                desafio_id: desafioId
            }
        })

        //apagar desafio em exercicios_desafio

        await client.exercicios_desafio.deleteMany({
            where:{
                desafio_id: desafioId
            }
        })

        //apagar regras_desafio

        await client.regras_desafio.deleteMany({
            where:{
                desafio_id: desafioId
            }
        })
        
        
        return {
            msg:"desafio removido com sucesso"
        }

    }
}


