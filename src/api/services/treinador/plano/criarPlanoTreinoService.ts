import { client } from "../../../prisma/client";
import { checkUserIdExists, checkModalidadeExists, checkExercicioExists } from "../../../helpers/dbHelpers";
import { Bloco } from "../../../Providers/blocoProvider";


interface IPlano{
    plano_treino_id : string;
    aluno_id : string;
    treinador_id : string;
    data : string;
    modalidade_id : string;
    blocos: Array<Bloco>;
}

export class CriarPlanoTreinoService{
    async execute({plano_treino_id, aluno_id, treinador_id, data, modalidade_id, blocos}: IPlano) {

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
                plano_treino_id: plano_treino_id,
                aluno_id: aluno_id,
                treinador_id: treinador_id,
                data: data,
                modalidade_id: modalidade_id
            },
        });

        // Percorrer cada bloco
        for (let i = 0; i < blocos.length; i++) {
            const bloco = await client.bloco_treino.create({
                data:{
                bloco_id: plano.blocoId,
                plano_treino_id: blocos[i].planoTreinoId,
                nome : blocos[i].nome,
                descricao: blocos[i].descricao
                },
            });
            // Percorrer cada exercicio do bloco
            const exercicios = blocos[i].exercicios
            for(let j = 0; j<exercicios.length; j++) {
                const exr = await client.exercicios_bloco.create({
                    data:{
                    bloco_id: bloco.blocoId,
                    exercicio_id:exercicios[j].exercicioId,
                    n_ordem_exercicio: exercicios[j].nOrdem
                    },
                });
                //Percorre as séries de cada exericio
                const series = exercicios[i].series
                for(let y = 0; y<series.length; y++) {
                    await client.series_exercicio.create({
                        data:{
                        exercicio_bloco_id: exr.exercicioBlocoId,
                        n_ordem_serie: series[y].nOrdem,
                        valor: series[y].valor,
                        peso: series[y].peso,
                        unidade_medida: series[y].unidadMedida,
                        },
                    });
                }
            }
        }
        return {
            msg: "O plano de treino foi criado com sucesso!",
        };
    }
}
