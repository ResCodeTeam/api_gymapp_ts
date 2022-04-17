import { client } from "../../prisma/client";

interface Idata {
    nome: string,
    modalidade: string,
    data_inicio: Date,
    data_fim: Date,
    recompensa: number,
    isDeleted: boolean,
    descricao: string,
}

export class EditarDesafioService {
    async execute(data: Idata,desafio_id:string) {

        if(data.data_inicio>data.data_fim){
            throw new Error("A data de final começa antes da inicial")
        }

        var atualizarDesafio = await client.desafios.findUnique({
            where:{desafio_id: desafio_id}
        })

        console.log(atualizarDesafio)

        if(atualizarDesafio == null){
            throw new Error("Não existe desafio com o id fornecido")
        }

        atualizarDesafio = await client.desafios.update({
            where:{
                desafio_id:desafio_id
            },
            data:{
                nome: data.nome,
                modalidade_id: data.modalidade,
                data_inicio: data.data_inicio,
                data_fim: data.data_fim,
                recompensa: data.recompensa,
                isDeleted : data.isDeleted,
                descricao: data.descricao
            }
        })

        return atualizarDesafio
           
    }
}
