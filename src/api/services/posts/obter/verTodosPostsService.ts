import { checkMobilidadeMarcaUser, checkUserIdExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";
class VerTodosPostsService{
    async execute(userId:string){
        
        
        const existsUser = await checkUserIdExists(userId)
        if(!existsUser){
            throw new Error("Utilizador invalido")
        }

        const {mobilidade,id} = await checkMobilidadeMarcaUser(userId);
        console.log(mobilidade,id)
        if(mobilidade){
            const publicacoes = await client.publicacoes.findMany({
                where:{
                    isDeleted:false,
                    users:{
                        alunos_marca:{
                            every:{
                                marca_id:id['marca_id']
                            }
                        }
                    }
                },
                select:{
                    publicacao_id:true,    
                    criador_id:true,
                    ginasio_id:true,
                    data:true,
                    descricao:true,
                    tipo:true,
                    imagens_publicacao:{
                        select:{
                            url:true
                        }
                    },
                    _count:{
                        select:{
                            gostos_publicacao:true
                        }
                    }
                },
                
            })
                
            return publicacoes
            
        }else{
            const publicacoes = await client.publicacoes.findMany({
                where:{
                    isDeleted:false,
                    users:{
                        aluno_ginasio:{
                            every:{
                                ginasio_id:id['ginasio_id']
                            }
                        },
                        definicoes_user:{
                            is_privado:false
                        }
                    }
                },
                select:{
                    publicacao_id:true,    
                    criador_id:true,
                    ginasio_id:true,
                    data:true,
                    descricao:true,
                    tipo:true,
                    imagens_publicacao:{
                        select:{
                            url:true
                        }
                    },
                    _count:{
                        select:{
                            gostos_publicacao:true
                        }
                    }

                },
                
            })
                
            return publicacoes
            
        }
    }
    
}

export { VerTodosPostsService };

