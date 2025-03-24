import { url_entorno } from '../../configs/url_entorno';
export class registroService {

  async insertarRegistro(receptor:any,escenario:any,KO:any): Promise<any> {
    //Creamos el json para enviar data
    const obj = {
      "id": 0,
      "idPersonajeEmisor": 0,
      "idPersonajeReceptor": receptor,
      "idMovimiento": 0,
      "idPosicionEscenario": escenario,
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
    return "OK";
  }




}