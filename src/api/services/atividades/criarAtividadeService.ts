import { client } from "../../prisma/client";

interface IAtividadeService {
  descricao: string,
  icon: string,
}

class CriarAtividadeService {
  async execute({
    descricao,
    icon
  }: IAtividadeService) {

    await client.atividades.create({
      data: {
        descricao,
        icon,    
      },
    });
    return { msg: "A atividade foi criada com sucesso!" };
  }
}
export { CriarAtividadeService };
