/**
 * @module EditarAvaliacaoService
 */
import { checkAutorAvaliacao, checkAvaliacoesExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

interface IAvaliacao {
    peso: number,
    unidade_peso: string,
    musculo: number,
    gordura_corporal: number,
    gordura_visceral: number,
    agua: number,
    proteina: number,
    massa_ossea: number,
    imc: number,
    metabolismo_basal: number,
    medidas: Array<{
        medida: string,
        unidadeMedida: string,
        localMedidaId: string,
    }>
    imagens: Array<{
        imagemUrl: string
    }>
}

export class EditarAvaliacaoService {
    async execute(dados: IAvaliacao, avaliacao_id: string, treinadorId: string) {

        const existstreinadorIdAvaliacao = await checkAutorAvaliacao(treinadorId);
        if (!existstreinadorIdAvaliacao) {
            return { data: "Treinador pertence há avaliação", status: 500 }
        }
        const existsAvaliacao = await checkAvaliacoesExists(avaliacao_id)
        if (!existsAvaliacao) {
            return { data: "Avaliação não existe", status: 500 }
        }

        if (existstreinadorIdAvaliacao != existsAvaliacao) {
            return { data: "treinador não pertence a esta avaliação", status: 500 }
        } else {


            await client.avaliacao_imagens.deleteMany({
                where: {
                    avaliacao_id: avaliacao_id
                }
            })

            await client.medidas_avaliacao.deleteMany({
                where: {
                    avaliacao_id: avaliacao_id
                }
            })

            for (let medida of dados.medidas) {
                await client.medidas_avaliacao.create({
                    data: {
                        avaliacao_id: avaliacao_id,
                        medida: medida.medida,
                        unidade_medida: medida.unidadeMedida,
                        local_medida_id: medida.localMedidaId
                    }
                })
            }

            for (let imagem of dados.imagens) {
                await client.avaliacao_imagens.create({
                    data: {
                        avaliacao_id: avaliacao_id,
                        url: imagem.imagemUrl,
                    }
                })
            }



            const atualizarAvaliacao = await client.avaliacoes.update({
                where: { avaliacao_id: avaliacao_id },
                data: {
                    peso: dados.peso,
                    unidade_peso: dados.unidade_peso,
                    musculo: dados.musculo,
                    gordura_corporal: dados.gordura_corporal,
                    gordura_visceral: dados.gordura_visceral,
                    agua: dados.agua,
                    imc: dados.imc,
                    proteina: dados.proteina,
                    massa_ossea: dados.massa_ossea,
                    metabolismo_basal: dados.metabolismo_basal,
                },
                select: {
                    avaliacao_id: true,
                    data: true,
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

            return { data: atualizarAvaliacao, status: 200 };
        }
    }
}