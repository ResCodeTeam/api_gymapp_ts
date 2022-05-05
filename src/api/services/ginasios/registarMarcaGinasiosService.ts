import { client } from "../../prisma/client";
import { checkDonoMarca, checkMarcaExists } from "../../helpers/dbHelpers";
import { getGymTag } from "../../helpers/tagHelpers";

interface IRegistarMarcaGinasiosService {
  nome: string;
  rua: string;
  cp: number;
  cpExt: number;
  marcaId: string;
  imagemUrl: string;
  lat: string;
  long: string;
  uId: string;
}

export class RegistarMarcaGinasiosService {
  async execute({
    nome,
    rua,
    cp,
    cpExt,
    marcaId,
    imagemUrl,
    lat,
    long,
    uId
  }: IRegistarMarcaGinasiosService) {
    // Obter a tag do ginásio automaticamente
    let tag = await getGymTag(nome);
    
    const exists_marca = await checkMarcaExists(marcaId);
    if (!exists_marca) {
      throw new Error("A marca não existe");
    }

    await checkDonoMarca(marcaId, uId)

    const localidade = await client.localidades.findFirst({
      where:{
        cp,
        cp_ext:cpExt
      }
    })

    const ginasio = await client.ginasio.create({
      data: {
        nome,
        rua,
        tag,
        imagem_url: "teste",
        lat,
        long,
        localidades:{
          connect:{
            cp_id:localidade.cp_id

          }
        },
        marcas:{
          connect:{
            marca_id:marcaId
          }
        }
      },
    });
    return ginasio;
  }
}

