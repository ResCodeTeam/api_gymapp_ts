import { checkAutorMarca, checkMarcaExists, checkNomeMarca } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

interface IEditarMarca{
  marcaId:string,
  nome:string,
  cor:string,
  logotipo:string,
  adminId:string,
  mobilidade:boolean,

}

export class EditarMarcaService {
  async execute({marcaId,adminId,nome,cor,logotipo,mobilidade} : IEditarMarca) {

    const existsMarca= await  checkMarcaExists(marcaId)
    if(!existsMarca)
    {
        throw new Error("Marca não existe")
    }

    const isAutor = await checkAutorMarca(adminId,marcaId)
    if(!isAutor){
        throw new Error("Não possui autorização para fazer esta alteração")
    }

    const exist_nome = await checkNomeMarca(nome);
    if (exist_nome) {
      throw new Error("A marca já existe");
    }
        
      const editarMarca = await client.marcas.update({
          where : {
            marca_id:marcaId
            
          },
          data : {
              nome:nome,
              cor:cor,
              logotipo:logotipo,
              mobilidade:mobilidade

          }
      }) 
    return {data: editarMarca, status: 200};
  }
}