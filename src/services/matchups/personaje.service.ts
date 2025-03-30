import { url_entorno } from '../../configs/url_entorno';

export class personajeService {
  async getPersonajes(): Promise<any> {
    const response = await fetch(url_entorno() + '/apiSmash/Personajes');
    const data = await response.json();
    // console.log("data",data)
    return data;
  }
}