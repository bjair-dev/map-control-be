import { findMotivationalPhraseById } from "../services/find/motivational.phrase"


export const  notExistsMotivationalPhrase = async(id:number) => {
    
    const find = await findMotivationalPhraseById({ id })
    
    if(!find) throw new Error(`No existe el id ${id}`)
    
}