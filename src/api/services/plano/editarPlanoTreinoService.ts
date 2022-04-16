import { checkPlanoTreinoExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";
import { Bloco } from "../../Providers/blocoProvider";
import { CriarPlanoTreinoService } from "./criarPlanoTreinoService";

interface IEditarPlano{
  planoId:string;
  alunoId : string;
  treinadorId : string;
  data : Date;
  modalidadeId : string;
  blocos: Array<Bloco>;
}

export class EditarPlanoTreinoService{
  async execute({planoId,alunoId, treinadorId, data, modalidadeId, blocos}: IEditarPlano){
    const existsPlano = await checkPlanoTreinoExists(planoId);
    if(!existsPlano){
      throw new Error("Plano de treino não existe")
    }

    await client.planos_treino.delete({
      where:{
        plano_treino_id:planoId
      }
    })

    const criarPlanoTreinoService=new CriarPlanoTreinoService();
    const resp = await criarPlanoTreinoService.execute({alunoId, treinadorId, data, modalidadeId, blocos})


    return resp

  }
}