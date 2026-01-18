import { url_entorno } from '../../configs/url_entorno';
import { authService } from '../authentication/auth.service';

export class registroService {

  /**
   * Obtiene los headers con autenticación si hay token disponible
   */
  private getAuthHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    const token = authService.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Maneja errores de autenticación (401)
   */
  private handleAuthError(response: Response): void {
    if (response.status === 401) {
      // Token inválido o expirado, limpiar sesión
      authService.logout();
      // Opcionalmente redirigir al login
      // window.location.href = '/login';
      throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
    }
    if (response.status === 403) {
      throw new Error('No tienes permisos para realizar esta acción.');
    }
  }

  async getAllRegistros(
    filtroEmisor: any,
    filtroReceptor: any,
    filtroRage: any,
    filtroPosicion: any,
    filtroStage: any,
    filtroMov: any
  ): Promise<any> {

    // Reemplaza valores "undefined" o null por nada
    filtroMov = filtroMov ?? null;
    filtroEmisor = filtroEmisor ?? null;
    filtroReceptor = filtroReceptor ?? null;
    filtroRage = filtroRage ?? null;
    filtroPosicion = filtroPosicion ?? null;
    filtroStage = filtroStage ?? null;


    // Construir parámetros dinámicamente
    const params = new URLSearchParams();
    if (filtroMov) params.append('filtroMovimiento', filtroMov);
    if (filtroEmisor) params.append('filtroEmisor', filtroEmisor);
    if (filtroReceptor) params.append('filtroReceptor', filtroReceptor);
    if (filtroRage) params.append('filtroRage', filtroRage);
    if (filtroPosicion) params.append('filtroPosicion', filtroPosicion);
    if (filtroStage) params.append('filtroStage', filtroStage);

    const url = `${url_entorno()}/apiSmash/Registro?${params.toString()}`;
    //console.log("url sample es ", url);

    // GET también necesita token (toda la app está protegida)
    const response = await fetch(url, { headers: this.getAuthHeaders() });
    const body = await response.json();
    return body;
  }


  async insertarRegistro(emisor: any, receptor: any, escenario: any, idAtaque: any, tipoAtaque: any, idAtaquePropiedad: any, idPosicion: any, KO: any, rage: any, diFinal: any): Promise<any> {
    // Verificar autenticación antes de intentar insertar
    if (!authService.isAuthenticated()) {
      throw new Error('Debes iniciar sesión para crear registros.');
    }

    //Creamos el json para enviar data
    const obj = {
      "id": 0,
      "idPersonajeEmisor": emisor,
      "idPersonajeReceptor": receptor,
      "idAtaque": idAtaque,
      "tipoAtaque": tipoAtaque,
      "idAtaquePropiedad": idAtaquePropiedad,
      "idEscenario": escenario,
      "idPosicion": idPosicion,
      "porcentajeKO": KO,
      "rage": rage,
      "di": diFinal
    };



    //Enviamos data con token de autenticación
    const response = await
      fetch(url_entorno() + '/apiSmash/Registro', {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(obj)
      }
      );

    this.handleAuthError(response);

    const body = await response.text();
    //console.log("response body", body);
    return body;
  }


  async updateRegistro(id: any, emisor: any, receptor: any, escenario: any, idAtaque: any, tipoAtaque: any, idAtaquePropiedad: any, idPosicion: any, KO: any, rage: any, diFinal: any): Promise<any> {
    // Verificar autenticación antes de intentar actualizar
    if (!authService.isAuthenticated()) {
      throw new Error('Debes iniciar sesión para editar registros.');
    }

    const rageInt = parseInt(rage);
    const obj = {
      "id": id,
      "idPersonajeEmisor": emisor,
      "idPersonajeReceptor": receptor,
      "idAtaque": idAtaque,
      "tipoAtaque": tipoAtaque,
      "idAtaquePropiedad": idAtaquePropiedad,
      "idEscenario": escenario,
      "idPosicion": idPosicion,
      "porcentajeKO": KO,
      "rage": rageInt,
      "di": diFinal
    }
    //console.log("objeto antes del update", obj)
    const response = await
      fetch(url_entorno() + '/apiSmash/Registro', {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(obj)
      }
      );

    this.handleAuthError(response);

    const body = await response.text();
    //console.log("response body", body);
    return body;
  }

  async deleteRegistro(id: any) {
    // Verificar autenticación antes de intentar eliminar
    if (!authService.isAuthenticated()) {
      throw new Error('Debes iniciar sesión para eliminar registros.');
    }

    var urltosend = '/apiSmash/Registro/' + id;
    const response = await fetch(url_entorno() + urltosend, {
      method: "DELETE",
      headers: this.getAuthHeaders()
    }
    );

    this.handleAuthError(response);

    const body = await response.text();
    //console.log("response body", body);
    return body;
  }
}