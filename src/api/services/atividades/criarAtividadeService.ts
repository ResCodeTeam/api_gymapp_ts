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

    const atividade = await client.atividades.create({
      data: {
        descricao,
        icon,
      },
    });
    return atividade;
  }
}
export { CriarAtividadeService };
