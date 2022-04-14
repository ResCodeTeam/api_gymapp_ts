import { client } from "../../prisma/client";
import { checkAutorTreino, checkTreinoExists, checkUserIdExists } from "../../helpers/dbHelpers";

interface ITreino{
    treinoId:string,
    uId: string,
    atividadeId: string,
    modalidadeId: string,
    duracao: string,
    calorias: number,
    distancia: number,
    data: Date
}

export class EditarTreinosService {
    async execute({uId, treinoId, atividadeId, modalidadeId, duracao, calorias, distancia, data} : ITreino){

        if(atividadeId == null && modalidadeId == null){
            throw new Error("ERRO!!! A atividade e a modalidade não podem ser ambos nulos, pelo menos uma deve ser diferente de null.");
        }
      
        if(atividadeId != null && modalidadeId != null){
           throw new Error("ERRO!!! A atividade e a modalidade não podem ser ambas diferentes de null, pelo menos uma deve ser null.");
        }

        const exist_nome = await checkUserIdExists(uId);
        if (!exist_nome) {
            throw new Error("O utilizador não existe");
        }

        const exists_treino = await checkTreinoExists(treinoId);
        if (!exists_treino) {
            throw new Error("O treino não existe");
        }

        const treino = await client.treinos.findUnique({
            where:{
                treino_id: treinoId
            }
        })
        const isAutor = await checkAutorTreino(uId,treinoId);
        console.log(uId)
        if(!isAutor){
            throw new Error("O treino não lhe pertence");
        }


        const editarTreinos = await client.treinos.update({
            where:{
                treino_id: treinoId
            },
            data: {
                atividade_id: atividadeId,
                modalidade_id: modalidadeId,
                duracao,
                calorias,
                distancia,
                data
            }
        })
        
        return {
            message: "Treino editado com sucesso!"
        }
    }
}