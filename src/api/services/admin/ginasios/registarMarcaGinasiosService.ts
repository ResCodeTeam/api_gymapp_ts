import { client } from "../../../prisma/client";
import { getGymTag } from "../../../helpers/tag_helpers";
import { checkUserIdExists } from "../../../helpers/dbHelpers";

interface IRegistarMarcaGinasiosService {
  nome: string;
  rua: string;
  cp: number;
  marcaId: string;
  estado: string;
  imagemUrl: string;
  lat: string;
  long: string;
  cpExt: number;
}

class RegistarMarcaGinasiosService {
  async execute({
    nome,
    rua,
    cp,
    marcaId,
    estado,
    imagemUrl,
    lat,
    long,
    cpExt,
  }: IRegistarMarcaGinasiosService) {
    // Obter a tag do ginásio automaticamente
    tag = await getGymTag(nome);

    const exists_marca = await checkUserIdExists(marcaId);
    if (exists_marca) {
      throw new Error("A marca não existe");
    }

    const ginasio = await client.ginasio.create({
      data: {
        nome,
        rua,
        cp,
        cp_ext: cpExt,
        marca_id: marcaId,
        tag,
        estado,
        imagem_url: imagemUrl,
        lat,
        long,
        descricao: "teste",
      },
    });
    return {
      msg: "O ginásio foi criado com sucesso!",
    };
  }
}

export { RegistarMarcaGinasiosService };
