/**
 * @module VerUmaAvaliacaoService
 */
import { checkAvaliacoesExists, checkUserIdExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

export class VerUmaAvaliacaoService {
    async execute(userId: string, avaliacaoId: string) {

        console.log(userId)
        const existsID = await checkUserIdExists(userId)
        if (!existsID) {
            return { data: "O utilizador não existe", status: 500 }
        }

        console.log("123")
        const exists_avaliacao = await checkAvaliacoesExists(avaliacaoId)
        if (!exists_avaliacao) {
            return { data: "A avaliação não existe", status: 500 }
        }

        const avaliacao = await client.avaliacoes.findFirst({
            where: {
                avaliacao_id: avaliacaoId,
                isDeleted: false
            },
            select: {
                peso: true,
                musculo: true,
                gordura_corporal: true,
                gordura_visceral: true,
                agua: true,
                proteina: true,
                massa_ossea: true,
                metabolismo_basal: true,
                avaliacao_imagens: {
                    select: {
                        url: true
                    }
                },
                medidas_avaliacao: {
                    select: {
                        medida: true,
                        unidade_medida: true,
                        locais_medidas: {
                            select: {
                                descricao: true,
                                unilado: true
                            }
                        },
                    }
                },
                users_avaliacoes_treinador_idTousers: {
                    select: {
                        nome: true,
                        imagem_url: true
                    }
                }
            }
        })
        return { data: avaliacao, status: 200 };
    }
}