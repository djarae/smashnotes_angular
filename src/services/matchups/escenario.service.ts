import { url_entorno } from '../../configs/url_entorno';

export class escenarioService {
  async getEscenarios(): Promise<any> {
    const response = await fetch(url_entorno() + '/apiSmash/Escenarios');
    const data = await response.json();
    console.log("data",data)
    return data;
  }
}