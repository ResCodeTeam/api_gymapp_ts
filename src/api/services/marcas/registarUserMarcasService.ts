import { client } from "../../prisma/client";
import { checkUserIdExists, checkNomeMarca, getDonoMarca } from "../../helpers/dbHelpers";

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
      return { data: "O user não existe!", status: 500 }
    }

    const exist_nome = await checkNomeMarca(nome);
    if (exist_nome) {
      return { data: "A marca já existe", status: 500 }
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
    return { data: marca, status: 200 };
  }
}

export { RegistarUserMarcasService };
