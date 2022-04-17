import { checkUserIdExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";



export class VerAvaliacoesService{
    async execute(alunoId:string){

        const exists_aluno= await checkUserIdExists(alunoId)
        if(!exists_aluno){
            throw new Error("O utilizador não existe")
        }

        const avaliacao = await client.avaliacoes.findMany({
            where:{
                aluno_id:alunoId,
                isDeleted:false
                
            },
        })
        return avaliacao;
    }
}