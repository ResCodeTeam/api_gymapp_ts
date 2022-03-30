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
            throw new Error("Não encontrou a publicação");
        }

        if (newData == null) {
            throw new Error("Falta a data");
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
            throw new Error("Não é possivel alterar! Data inválida");
        }

        if (descricao == null) {
            throw new Error("Falta a descrição");
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
            throw new Error("Não é possivel alterar! Descrição é igual");
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
            message: "Desafio encerrado com sucesso!",
            publicação
        }
    }
}