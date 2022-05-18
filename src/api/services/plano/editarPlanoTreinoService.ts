import { checkModalidadeExists, checkPlanoTreinoExists, getMarcaGym, getModalidadeGinasio, getTreinadorMarca, getTreinadorPlano } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";
import { Bloco } from "../../Providers/blocoProvider";
import { CriarPlanoTreinoService } from "./criarPlanoTreinoService";

interface IEditarPlano {
  planoId: string;
  alunoId: string;
  treinadorId: string;
  data: Date;
  modalidadeId: string;
  blocos: Array<Bloco>;
}

export class EditarPlanoTreinoService {
  async execute({ planoId, alunoId, treinadorId, data, modalidadeId, blocos }: IEditarPlano) {
    const existsPlano = await checkPlanoTreinoExists(planoId);
    if (!existsPlano) {
      return { data: "Plano de treino não existe", status: 500 }
    }

    const autor = await getTreinadorPlano(planoId);
    const marca_treinador_plano = await getTreinadorMarca(autor)
    const marca_treinador = await getTreinadorMarca(treinadorId)

    if (marca_treinador_plano != marca_treinador) {
      return { data: "Não tem autorização", status: 500 }
    }

    await client.planos_treino.delete({
      where: {
        plano_treino_id: planoId
      }
    })

    const criarPlanoTreinoService = new CriarPlanoTreinoService();
    const resp = await criarPlanoTreinoService.execute({ alunoId, treinadorId, data, modalidadeId, blocos })


    return { data: resp, status: 200 };

  }
}