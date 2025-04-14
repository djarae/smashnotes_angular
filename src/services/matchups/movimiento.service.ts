import { url_entorno } from '../../configs/url_entorno';

export class movimientoService {
  async getMovimientos(): Promise<any> {
    const response = await fetch(url_entorno() + '/apiSmash/Movimientos');
    const data = await response.json();
    // console.log("data",data)
    return data;
  }
}