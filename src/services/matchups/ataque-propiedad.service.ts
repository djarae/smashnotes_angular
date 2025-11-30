import { url_entorno } from '../../configs/url_entorno';

export interface AtaquePropiedad {
    id: number;
    nombre: string;
    abreviatura: string;
}

export class AtaquePropiedadService {

    async getAtaquePropiedades(): Promise<AtaquePropiedad[]> {
        const response = await fetch(url_entorno() + '/apiSmash/AtaquePropiedades');
        const data = await response.json();
        return data;
    }
}
