export const ExistsTypeContentParameter = async (type: string) => {

    const options = ['encuestas','videos','preguntas','desafios','tips']
    if(!options.includes(type))throw new Error(`¡Las opciones disponibles como parametros son : ${options.join()}!`)
  }
  