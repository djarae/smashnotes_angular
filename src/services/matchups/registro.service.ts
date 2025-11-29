import { url_entorno } from '../../configs/url_entorno';
export class registroService {
  async getAllRegistros(
    filtroEmisor: any,
    filtroReceptor: any,
    filtroRage: any,
    filtroPosicion: any,
    filtroStage: any,
    filtroMov: any
  ): Promise<any> {
    console.log("desde el service getAllRegistros");

    // Reemplaza valores "undefined" o null por nada
    filtroMov = filtroMov ?? null;
    filtroEmisor = filtroEmisor ?? null;
    filtroReceptor = filtroReceptor ?? null;
    filtroRage = filtroRage ?? null;
    filtroPosicion = filtroPosicion ?? null;
    filtroStage = filtroStage ?? null;

    console.log("filtroEmisor y filtroMov son: ", filtroEmisor, filtroMov);

    // Construir parámetros dinámicamente
    const params = new URLSearchParams();
    if (filtroMov) params.append('filtroMovimiento', filtroMov);
    if (filtroEmisor) params.append('filtroEmisor', filtroEmisor);
    if (filtroReceptor) params.append('filtroReceptor', filtroReceptor);
    if (filtroRage) params.append('filtroRage', filtroRage);
    if (filtroPosicion) params.append('filtroPosicion', filtroPosicion);
    if (filtroStage) params.append('filtroStage', filtroStage);

    const url = `${url_entorno()}/apiSmash/Registro?${params.toString()}`;
    console.log("url sample es ", url);

    const response = await fetch(url);
    const body = await response.json();
    console.log("response body", body);
    return body;
  }


  async insertarRegistro(emisor: any, receptor: any, escenario: any, idAtaque: any, tipoAtaque: any, KO: any, rage: any, diFinal: any, posicion: any): Promise<any> {
    console.log("dsede srevice insertar receptor ,escenario y porcentaje son: ", emisor, receptor, escenario, idAtaque, KO);
    //Creamos el json para enviar data
    const obj = {
      "id": 0,
      "idPersonajeEmisor": emisor,
      "idPersonajeReceptor": receptor,
      "idAtaque": idAtaque,
      "tipoAtaque": tipoAtaque,
      "idEscenario": escenario,
      "idPosicion": posicion,
      "porcentajeKO": KO,
      "rage": rage,
      "di": diFinal
    };

    //Enviamos data
    const response = await
      fetch(url_entorno() + '/apiSmash/Registro', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
      }
      );
    const body = await response.text();
    console.log("response body", body);
    return body;
  }


  async updateRegistro(id: any, emisor: any, receptor: any, escenario: any, idAtaque: any, tipoAtaque: any, KO: any, rage: any, diFinal: any, posicion: any): Promise<any> {
    const rageInt = parseInt(rage);
    console.log("el valor del DI es  ;" + diFinal);
    const obj = {
      "id": id,
      "idPersonajeEmisor": emisor,
      "idPersonajeReceptor": receptor,
      "idAtaque": idAtaque,
      "tipoAtaque": tipoAtaque,
      "idEscenario": escenario,
      "idPosicion": posicion,
      "porcentajeKO": KO,
      "rage": rageInt,
      "di": diFinal,
    }
    const response = await
      fetch(url_entorno() + '/apiSmash/Registro', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
      }
      );
    const body = await response.text();
    console.log("response body", body);
    return body;
  }

  async deleteRegistro(id: any) {
    console.log("desde el service delete id es: ", id);
    var urltosend = '/apiSmash/Registro/' + id;
    console.log("url to send ", urltosend);
    const response = await fetch(url_entorno() + urltosend, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    }
    );
    const body = await response.text();
    console.log("response body", body);
    return body;
  }

}