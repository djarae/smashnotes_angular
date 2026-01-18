import { url_entorno } from '../../configs/url_entorno';
import { authService } from '../authentication/auth.service';

export class movimientoService {
  async getMovimientos(): Promise<any> {
    const token = authService.getToken();
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url_entorno() + '/apiSmash/Movimientos', { headers });
    const data = await response.json();
    return data;
  }
}