import { url_entorno } from '../../configs/url_entorno';
import { authService } from '../authentication/auth.service';

export interface AtaquePropiedad {
    id: number;
    nombre: string;
    abreviatura: string;
}

export class AtaquePropiedadService {

    async getAtaquePropiedades(): Promise<AtaquePropiedad[]> {
        const token = authService.getToken();
        const headers: HeadersInit = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url_entorno() + '/apiSmash/AtaquePropiedades', { headers });
        const data = await response.json();
        return data;
    }
}
