import { checkModalidadeExists, checkUserIdExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";
import { Bloco } from "../../Providers/blocoProvider";



interface IPlano{
    aluno_id : string;
    treinador_id : string;
    data : Date;
    modalidade_id : string;
    blocos: Array<Bloco>;
}

export class CriarPlanoTreinoService{
    async execute({ aluno_id, treinador_id, data, modalidade_id, blocos}: IPlano) {
        console.log(blocos)
        const exists_aluno = await checkUserIdExists(aluno_id);
        if (!exists_aluno) {
          throw new Error("O aluno não existe");
        }

        const exists_treinador = await checkUserIdExists(treinador_id);
        if (!exists_treinador) {
          throw new Error("Ginásio não existe");
        }

        const exists_modalidade = await checkModalidadeExists(modalidade_id);
        if (!exists_modalidade) {
          throw new Error("A modalidade não existe");
        }

        const plano = await client.planos_treino.create({
          data:{
            aluno_id: aluno_id,
            treinador_id: treinador_id,
            data: data,
            modalidade_id: modalidade_id
          },
        })

        // Percorrer cada bloco
        for (let i = 0; i < blocos.length; i++) {
          const bloco = await client.bloco_treino.create({
            data:{
              n_ordem:blocos[i].nOrdem,
              plano_treino_id: plano.plano_treino_id,
              nome : blocos[i].nome,
              descricao: blocos[i].descricao
            },
          })
          // Percorrer cada exercicio do bloco
          const exercicios = blocos[i].exercicios
          for(let j = 0; j<exercicios.length; j++) {
            const exr = await client.exercicios_bloco.create({
              data:{
                bloco_id: bloco.bloco_id,
                exercicio_id:exercicios[j].exercicioId,
                n_ordem_exercicio: exercicios[j].nOrdem
              },
            });
            //Percorre as séries de cada exericio
            const series = exercicios[i].series
            for(let y = 0; y<series.length; y++) {
              await client.series_exercicio.create({
                data:{
                  n_ordem_serie: series[y].nOrdem,
                  valor: series[y].valor,
                  exercicios_bloco_id:exr.exercicios_bloco_id
                },
              });
            }
          }
        }
        return plano;
    }
}
