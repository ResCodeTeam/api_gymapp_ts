import { client } from "../../prisma/client";
import { checkUserIdExists, checkNomeMarca } from "../../helpers/dbHelpers";

interface IRegistarUserMarcasSerice {
  userId: string;
  nome: string;
  mobilidade: boolean;
  cor: string;
  logotipo: string;
}

class RegistarUserMarcasService {
  async execute({ userId, nome, mobilidade, cor, logotipo,
  }: IRegistarUserMarcasSerice) {
    const exists_user = await checkUserIdExists(userId);
    if (!exists_user) {
      return { date: "O user não existe!", status: 500 }
    }

    const exist_nome = await checkNomeMarca(nome);
    if (exist_nome) {
      return { date: "A marca já existe", status: 500 }
    }

    const marca = await client.marcas.create({
      data: {
        dono_id: userId,
        nome,
        mobilidade,
        cor,
        logotipo,
      },
    });
    return marca;
  }
}

export { RegistarUserMarcasService };
