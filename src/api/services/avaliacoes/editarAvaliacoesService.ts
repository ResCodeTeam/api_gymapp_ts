/**
 * @module EditarAvaliacaoService
 */
import { checkAutorAvaliacao, checkAvaliacoesExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * @param peso medida do peso
 * @param unidade_peso unidade da medida do peso
 * @param musculo medida do músculo
 * @param gordura_corporal medida da gordura corporal
 * @param gordura_visceral medida da gordura Visceral
 * @param agua medida da água
 * @param proteina medida da proteína
 * @param massa_ossea medida da massa óssea
 * @param imc medida do imc
 * @param metabolismo_basal medida do metabolismo basal
 * @param medidas conjunto de medidas da avaliação
 * @param imagens conjunto de imagens da avaliação
 */
export interface IAvaliacao {
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

/**
 * Classe responsavel pelo serviço de edição de uma avaliação
 */
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