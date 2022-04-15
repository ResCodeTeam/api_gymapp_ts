import { client } from "../../prisma/client";

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


        console.log("Descrição - " + verificaDescricao);

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
            }
        })
        return publicação;
    }
}