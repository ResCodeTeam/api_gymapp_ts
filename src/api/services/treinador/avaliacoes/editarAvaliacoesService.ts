import { client } from "../../../prisma/client";

interface IAvaliacao {
    data: Date,
    peso: number,
    unidade_peso: string,
    musculo: number,
    gordura_corporal: number,
    gordura_visceral: number,
    agua : number,
    proteina : number,
    massa_ossea: number,
    metabolismo_basal:number,
}

export class EditarAvaliacaoService{
    async execute(dados:IAvaliacao, avaliacao_id : string){
        
        var atualizarAvaliacao = await client.avaliacoes.findUnique({
            where:{avaliacao_id:avaliacao_id}
        })
        
        if(atualizarAvaliacao == null){
            return "404";
        }

        atualizarAvaliacao = await client.avaliacoes.update({
            where: {avaliacao_id:avaliacao_id},
            data:{
                data: dados.data,
                peso: dados.peso,
                unidade_peso: dados.unidade_peso,
                musculo: dados.musculo,
                gordura_corporal: dados.gordura_corporal,
                gordura_visceral: dados.gordura_visceral,
                agua: dados.agua,
                proteina: dados.proteina,
                massa_ossea: dados.massa_ossea,
                metabolismo_basal:dados.metabolismo_basal,
            }
        })

        return atualizarAvaliacao;
    }

}