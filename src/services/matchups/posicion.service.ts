import { url_entorno } from '../../configs/url_entorno';

export class posicionService {
    async getPosiciones(): Promise<any> {
        const response = await fetch(url_entorno() + '/apiSmash/Posiciones');
        const data = await response.json();
        return data;
    }
}
