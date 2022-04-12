import { checkMusculoNomeExists } from "../../helpers/dbHelpers";

export class AddMusculoService{
  async execute(nome:string, image:string){
    const existsMusculeName = await checkMusculoNomeExists(nome);
    if(existsMusculeName){
      throw new Error("Musculo já existente")
    }

    
  }
}