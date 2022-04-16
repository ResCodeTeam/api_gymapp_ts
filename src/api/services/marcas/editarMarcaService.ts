import { checkAutorMarca, checkMarcaExists } from "../../helpers/dbHelpers";
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
    console.log(marcaId,adminId)
    const isAutor = await checkAutorMarca(adminId,marcaId)
    if(!isAutor){
        throw new Error("não possui autorização para fazer esta alteração")
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

  
      return editarMarca
          
        
      
  }
}