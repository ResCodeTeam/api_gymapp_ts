import { client } from "../../../prisma/client";
import { checkUserIdExists, checkNomeMarca } from "../../../helpers/dbHelpers";

interface IRegistarUserMarcasSerice {
  userId: string;
  nome: string;
  mobilidade: boolean;
  cor: string;
  logotipo: string;
}

class RegistarUserMarcasService {
  async execute({userId, nome, mobilidade, cor, logotipo,
  }: IRegistarUserMarcasSerice) {
    const exists_user = await checkUserIdExists(userId);
    if (!exists_user) {
      throw new Error("User não existe!");
    }

    const exist_nome = await checkNomeMarca(nome);
    if (exist_nome) {
      throw new Error("A marca já existe");
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
    return { msg: "A marca foi criada com sucesso!",marca };
  }
}

export { RegistarUserMarcasService };
