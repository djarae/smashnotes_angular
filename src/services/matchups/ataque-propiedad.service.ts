import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url_entorno } from '../../configs/url_entorno';

export interface AtaquePropiedad {
    id: number;
    nombre: string;
    abreviatura: string;
}

@Injectable({
    providedIn: 'root'
})
export class AtaquePropiedadService {

    private url = url_entorno() + '/apiSmash/AtaquePropiedades';

    constructor(private http: HttpClient) { }

    getAtaquePropiedades(): Observable<AtaquePropiedad[]> {
        return this.http.get<AtaquePropiedad[]>(this.url);
    }
}
