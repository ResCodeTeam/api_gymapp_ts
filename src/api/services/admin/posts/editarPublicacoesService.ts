import { client } from "../../../prisma/client";

interface IPublicacao{
    publicacaoId: string,
    newData: Date,
    descricao: string
}

export class EditarPublicacaoService {
    async execute({publicacaoId, newData, descricao} : IPublicacao){

        if ( publicacaoId == null) {
            throw new Error("Impossível aceder à publicação.");
        }

        const existePublicacao = await client.publicacoes.findMany({
            where : {
                publicacao_id : publicacaoId,
            },
            select : {
                publicacao_id : true
            }
        });

        if (!existePublicacao) {
            throw new Error("Impossível encontrar a publicação");
        }

        if (newData == null) {
            throw new Error("Campo data não preenchido");
        }

        const verificaData = await client.publicacoes.findMany({
            where : {
                publicacao_id : publicacaoId,
                data : {
                     gte: newData
                }
            },
            select : {
                data : true
            }
        });

        if (verificaData) {
            throw new Error("Impossível alterar! Data inválida.");
        }

        if (descricao == null) {
            throw new Error("Campo descrição não preenchido");
        }

        const verificaDescricao = await client.publicacoes.findMany({
            where : {
                publicacao_id : publicacaoId,
                descricao : {
                     equals: descricao
                }
            },
            select : {
                data : true
            }
        });

        if (verificaDescricao) {
            throw new Error("Impossível alterar! Descrição atual é igual à anterior.");
        }

        const publicação = await client.publicacoes.update({
            where : {
                publicacao_id : publicacaoId
            },
            data: {
                data : newData,
                descricao
            }
        })
        return {
            message: "Publicação editada com sucesso!",
            publicação
        }
    }
}