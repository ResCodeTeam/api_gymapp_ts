import { client } from "../../../prisma/client";
import { checkUserIdExists } from "../../../helpers/dbHelpers";
import { getGymTag } from "../../../helpers/tagHelpers";

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

export class RegistarMarcaGinasiosService {
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
    let tag = await getGymTag(nome);
    
    const exists_marca = await checkUserIdExists(marcaId);
    if (exists_marca) {
      throw new Error("A marca não existe");
    }
    console.log("teste");

    await client.ginasio.create({
      data: {
        nome,
        rua,
        tag,
        estado,
        imagem_url: "teste",
        lat,
        long,
        localidades:{
          connect:{
            cp
          }
        },
        localidades_ext:{
          connect:{
            cp_ext:cpExt
          }
        },
        marcas:{
          connect:{
            marca_id:marcaId
          }
        }
      },
    });
    console.log("teste1");
    return {
      msg: "O ginásio foi criado com sucesso!",
    };
  }
}

