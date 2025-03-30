import { url_entorno } from '../../configs/url_entorno';
export class registroService {

  async insertarRegistro(receptor:any,escenario:any,KO:any): Promise<any> {
    console.log("dsede srevice insertar receptor ,escenario y porcentaje son: ",receptor,escenario,KO);
    //Creamos el json para enviar data
    const obj = {
      "id": 0,
      "idPersonajeEmisor": 0,
      "idPersonajeReceptor": receptor,
      "idMovimiento": 0,
      "idEscenario": escenario,
      "porcentajeKO": KO
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
  console.log("response body",body);
  return body;
  }


  async updateRegistro(receptor:any,escenario:any,KO:any): Promise<any> {
    console.log("desde el service receptor ,escenario y porcentaje son: ",receptor,escenario,KO);

    const obj = {
      "id": 1,
      "idPersonajeEmisor": 35,
      "idPersonajeReceptor": receptor,
      "idMovimiento": 16,
       "idEscenario": escenario,
      "idPosicion": 1,
      "porcentajeKO": KO
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
  console.log("response body",body);
    return body;
  }

}