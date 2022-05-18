import { checkAutorPublicacoes, checkPublicacaoExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

interface IPublicacao{
    uId: string,
    publicacaoId: string,
    newData: Date,
    descricao: string
}

export class EditarPublicacaoService {
    async execute({uId, publicacaoId, newData, descricao} : IPublicacao){

        if ( publicacaoId == null) {
            throw new Error("Impossível aceder à publicação.");
        }

        const exists = await checkPublicacaoExists(publicacaoId)
        if(!exists){
            throw new Error ("A publicação não existe")
        }

        const isAutor = await checkAutorPublicacoes(uId, publicacaoId)
        if(!isAutor){
            throw new Error ("Não possui autorização")
        }
      
        if (newData == null) {
            throw new Error("Campo data não preenchido");
        }
      
        const verificaData = await client.publicacoes.findUnique({
            where : {
                publicacao_id : publicacaoId,
            },
            select : {
                data : true
            }
        });


        if (verificaData.data > newData) {
            throw new Error("Não é possivel alterar! Data inválida");

        }

        if (descricao == null) {
            throw new Error("Campo descrição não preenchido");
        }

        const verificaDescricao = await client.publicacoes.findUnique({
            where : {
                publicacao_id : publicacaoId,
            },
            select : {
                descricao : true,
            }
        });

        if (verificaDescricao.descricao == descricao) {
            throw new Error("Não é possivel alterar! Descrição é igual");

        }

        const publicação = await client.publicacoes.update({
            where : {
                publicacao_id : publicacaoId
            },
            data: {
                data : newData,
                descricao
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
                identificacoes_publicacoes:{
                    select:{
                        users:{
                            select:{
                                nome:true,
                                uid:true,
                                imagem_url:true
                            }
                        }
                    }
                },
                comentarios_publicacao:{
                    select:{
                        users:{
                            select:{
                                nome:true,
                                uid:true,
                                imagem_url:true
                            }
                        },
                        comentario:true,
                    }
                }
            },
        })
        return {data: publicação, status: 200};
    }
}