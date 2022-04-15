import { getUserByID } from "../../../helpers/dbHelpers"
import { client } from "../../../prisma/client"

export class VerTodosPostsUserService{
    async execute(userId:string){
        if(!userId){
            throw new Error("Utilizador não existe")
        }

        const existsUser= await getUserByID(userId)
        if(!existsUser){
            throw new Error("Utilizador não existe")
        }

        const posts = await client.publicacoes.findMany({
            where:{
                criador_id:userId,
                isDeleted:false,
                users:{
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
                },
                gostos_publicacao:{
                    select:{
                        users:{
                            select:{
                                nome:true,
                                uid:true,
                                imagem_url:true
                            }
                        },
                    }
                },
            },
        })

        return posts
        
    }
}