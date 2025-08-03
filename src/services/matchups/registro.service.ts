import { url_entorno } from '../../configs/url_entorno';
export class registroService {

  async getAllRegistros(
    filtroEmisor:any,
    filtroReceptor:any,
    filtroRage:any,
    filtroPosicion:any,
    filtroStage:any,
    filtroMov:any
  ): Promise<any> {
    console.log("desde el service getAllRegistros");

filtroMov=filtroMov==undefined?0:filtroMov;
    console.log("filtroEmisor y filtroMov son: ",filtroEmisor,filtroMov);


    const urlSample = (url_entorno() + '/apiSmash/Registro?filtroMovimiento=' 
    + filtroMov
    +"&filtroEmisor=" + filtroEmisor
    + "&filtroReceptor=" + filtroReceptor
    + "&filtroRage=" + filtroRage
    + "&filtroPosicion=" + filtroPosicion
    + "&filtroStage=" + filtroStage)
    console.log("url sample es ",urlSample);

    const response =await fetch(url_entorno() + '/apiSmash/Registro?filtroMovimiento=' 
    + filtroMov
    +"&filtroEmisor=" + filtroEmisor
    + "&filtroReceptor=" + filtroReceptor
    + "&filtroRage=" + filtroRage
    + "&filtroPosicion=" + filtroPosicion
    + "&filtroStage=" + filtroStage);
    const body = await response.json();
    console.log("response body",body);
    return body;
  }

  async insertarRegistro(emisor:any,receptor:any,escenario:any,movimiento:any,KO:any,rage:any): Promise<any> {
    console.log("dsede srevice insertar receptor ,escenario y porcentaje son: ",emisor, receptor,escenario,movimiento,KO);
    //Creamos el json para enviar data
    const obj = {
      "id": 0,
      "idPersonajeEmisor": emisor,
      "idPersonajeReceptor": receptor,
      "idMovimiento": movimiento,
      "idEscenario": escenario,
      "porcentajeKO": KO,
      "rage" :rage 
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


  async updateRegistro(id:any,emisor:any, receptor:any,escenario:any,movimiento:any,KO:any,rage:any): Promise<any> {
    console.log("desde el service emisor,receptor ,escenario ,movimiento , porcentaje,rage son: ",emisor,receptor,escenario,movimiento,KO,rage);
    console.log("aaatipos de porcentaje ko y rage son: ",typeof KO,typeof rage);
   const rageInt=parseInt(rage);
   console.log("aaatipos de porcentaje ko y rageINT son: ",typeof KO,typeof rageInt);
    const obj = {
      "id": id,
      "idPersonajeEmisor": emisor,
      "idPersonajeReceptor": receptor,
      "idMovimiento": movimiento,
       "idEscenario": escenario,
      "idPosicion": 1,
      "porcentajeKO": KO,
      "rage" : 300
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
  
  async deleteRegistro(id:any){
     console.log("desde el service delete id es: ",id);
     var urltosend = '/apiSmash/Registro/'+id;
     console.log("url to send ",urltosend);
    const response = await fetch(url_entorno() + urltosend, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    }
    );
  const body = await response.text();
  console.log("response body",body);
    return body;
  }

}