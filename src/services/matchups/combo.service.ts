import { url_entorno } from '../../configs/url_entorno';

export class comboService {
    async getCombos(): Promise<any> {
        const response = await fetch(url_entorno() + '/apiSmash/Combo');
        const data = await response.json();
        return data;
    }
}
