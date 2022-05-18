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
            select:{
                avaliacao_id:true,
                data:true,
                peso:true,
                musculo:true,
                gordura_corporal:true,
                gordura_visceral:true,
                agua:true,
                proteina:true,
                massa_ossea:true,
                metabolismo_basal:true,
                avaliacao_imagens:{
                    select:{
                        url:true
                    }
                },
                medidas_avaliacao:{
                    select:{
                        medida:true,
                        unidade_medida:true,
                        locais_medidas:{
                            select:{
                                descricao:true,
                                unilado:true
                            }
                        },
                    }
                },
                users_avaliacoes_treinador_idTousers:{
                    select:{
                        nome:true,
                        imagem_url:true
                    }
                }
            }
        })
        return {data: avaliacao, status: 200};
    }
}