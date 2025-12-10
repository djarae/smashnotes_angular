import { url_entorno } from '../../configs/url_entorno';

export class ataqueService {
    async getAtaques(): Promise<any> {
        const response = await fetch(url_entorno() + '/apiSmash/Ataques');
        const data = await response.json();
        return data;
    }
}
