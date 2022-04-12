import { checkAvaliacoesExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";



export class VerAvaliacoesService{
    async execute(alunoId:string){

        const exists_avaliacao= await checkAvaliacoesExists(alunoId)
        if(!exists_avaliacao){
            throw new Error("Utilizador não existe")
        }

        const avaliacao = await client.avaliacoes.findMany({
            where:{
                aluno_id:alunoId,
                isDeleted:false
                
            },
                })
        return {
            avaliacao
        }
    }
}