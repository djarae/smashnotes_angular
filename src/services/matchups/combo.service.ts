import { url_entorno } from '../../configs/url_entorno';
import { authService } from '../authentication/auth.service';

export class comboService {
    async getCombos(): Promise<any> {
        const token = authService.getToken();
        const headers: HeadersInit = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url_entorno() + '/apiSmash/Combo', { headers });
        const data = await response.json();
        return data;
    }
}
