import { checkUserIdExists, getAlunoMarca, getTreinadorMarca } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";
import { Medida } from "../../Providers/medidaProvider";

interface ICriarAvaliacaoService {
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
  metabolismoBasal: number,
  imagens: Array<string>,
  medidas: Array<Medida>
}

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
    metabolismoBasal,
    imagens,
    medidas }: ICriarAvaliacaoService) {


    const existsalunoId = await checkUserIdExists(alunoId);
    if (!existsalunoId) {
      throw new Error("Aluno não existe")

    }
    const existstreinadorId = await checkUserIdExists(treinadorId);
    if (!existstreinadorId) {
      throw new Error("Treinador não existe")
    }
    const alunoMarca = await getAlunoMarca(alunoId);
    const treinadorMarca = await getTreinadorMarca(treinadorId);

    if (alunoMarca != treinadorMarca) {
      throw new Error("Não é possivel criar avaliação")
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
          proteina: proteina,
          massa_ossea: massaOssea,
          metabolismo_basal: metabolismoBasal
        }
      })

      for (let i = 0; i < imagens.length; i++) {
        await client.avaliacao_imagens.create({
          data: {

            avaliacao_id: avaliacao.avaliacao_id,
            url: imagens[i]

          }
        })

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
        return {data: avaliacao, status: 200};
      }
    }
  }
}
