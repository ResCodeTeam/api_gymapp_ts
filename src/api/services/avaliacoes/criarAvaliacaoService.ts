/**
 * @module CriarAvaliacaoService
 */
import { checkUserIdExists, getAlunoMarca, getTreinadorMarca } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";
import { Medida } from "../../Providers/medidaProvider";

/**
 * @param alunoId id do aluno
 * @param data data da avaliação
 * @param peso medida do peso
 * @param unidadePeso unidade da medida do peso
 * @param treinadorId id do treinador
 * @param musculo medida do músculo
 * @param gorduraCorporal medida da gordura corporal
 * @param gorduraVisceral medida da gordura Visceral
 * @param agua medida da água
 * @param proteina medida da proteína
 * @param massaOssea medida da massa óssea
 * @param imc medida do imc
 * @param metabolismoBasal medida do metabolismo basal
 * @param imagens conjunto de imagens da avaliação
 * @param medidas conjunto de medidas da avaliação
 */
export interface ICriarAvaliacaoService {
  alunoId: string,
  data: Date,
  peso: number,
  unidadePeso: string,
  treinadorId: string,
  musculo: number,
  gorduraCorporal: number,
  gorduraVisceral: number,
  agua: number,
  proteina: number,
  massaOssea: number,
  imc: number,
  metabolismoBasal: number,
  imagens: Array<string>,
  medidas: Array<Medida>
}

/**
 * Classe responsavel pelo serviço de criação de uma avaliação
 */
export class CriarAvaliacaoService {
  async execute({
    alunoId,
    data,
    peso,
    unidadePeso,
    treinadorId,
    musculo,
    gorduraCorporal,
    gorduraVisceral,
    agua,
    proteina,
    massaOssea,
    imc,
    metabolismoBasal,
    imagens,
    medidas }: ICriarAvaliacaoService) {


    const existsalunoId = await checkUserIdExists(alunoId);
    if (!existsalunoId) {
      return { data: "Aluno não existe", status: 500 }
    }
    const existstreinadorId = await checkUserIdExists(treinadorId);
    if (!existstreinadorId) {
      return { data: "Treinador não existe", status: 500 }
    }
    const alunoMarca = await getAlunoMarca(alunoId);
    const treinadorMarca = await getTreinadorMarca(treinadorId);

    if (alunoMarca != treinadorMarca) {
      return { data: "Não é possivel criar avaliação", status: 500 }
    } else {


      const avaliacao = await client.avaliacoes.create({
        data: {
          aluno_id: alunoId,
          data: data,
          peso: peso,
          unidade_peso: unidadePeso,
          treinador_id: treinadorId,
          musculo: musculo,
          gordura_corporal: gorduraCorporal,
          gordura_visceral: gorduraVisceral,
          agua: agua,
          imc: imc,
          proteina: proteina,
          massa_ossea: massaOssea,
          metabolismo_basal: metabolismoBasal
        }
      })
      try {
        for (let i = 0; i < imagens.length; i++) {
          await client.avaliacao_imagens.create({
            data: {

              avaliacao_id: avaliacao.avaliacao_id,
              url: imagens[i]

            }
          })
        }

        for (let i = 0; i < medidas.length; i++) {
          await client.medidas_avaliacao.create({
            data: {
              avaliacao_id: avaliacao.avaliacao_id,
              medida: medidas[i].medida,
              unidade_medida: medidas[i].unidadeMedida,
              local_medida_id: medidas[i].localMedidaId
            }
          })
        }


        return { data: avaliacao, status: 200 };
      } catch (err) {
        await client.avaliacoes.delete({
          where: {
            avaliacao_id: avaliacao.avaliacao_id
          }
        })
        return { data: "Erro ao criar avaliação", status: 500 }
      }

    }
  }
}
