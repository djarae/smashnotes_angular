import { Component } from '@angular/core';

@Component({
  selector: 'app-agr-registro',
  templateUrl: './agr-registro.component.html',
  styleUrls: ['./agr-registro.component.css']
})
export class AgrRegistroComponent {
  selectPersonaje:string[]=[];
  lstPersonajes : any;
  lstEscenarios : any;
  lstPosiciones : any;

  body: string=""


  async ngOnInit() {
   // const response = await fetch('http://127.0.0.1:8080/apiSmash/GetListPersonajes');
    const response = await fetch('https://smashnotes-springboot-back-1.onrender.com/apiSmash/GetListPersonajes');
    //const responseEscenarios = await fetch('http://127.0.0.1:8080/apiSmash/GetListEscenarios');
    const responseEscenarios = await fetch('https://smashnotes-springboot-back-1.onrender.com/apiSmash/GetListEscenarios');
   
    this.body = await response.json();
    this.lstPersonajes=this.body;
    this.body = await responseEscenarios.json();
    this.lstEscenarios=this.body;

    //El get posicion escenario ,deberia cargarse una vez selecciono escenario
    // const responsePosiciones = await fetch('http://127.0.0.1:8080/apiSmash/GetListPosicionesEscenarios');
    // this.body = await responsePosiciones.json();
    // this.lstPosiciones=this.body;



  }

async addNuevoPorcentajeKO(){
  let idPersonajeEmisorInsertar =0;
console.log("agregaremos nuevo %");
console.log("boton springboot");
console.log(this.selectPersonaje);
for (let i=0;i<this.lstPersonajes.length;i++){
  // console.log("id pj a buscar");
  // console.log(this.lstPersonajes[i].id)

  if (this.lstPersonajes[i].nombre==this.selectPersonaje){
    console.log("encontro algo")
    console.log(this.lstPersonajes[i].id)
    idPersonajeEmisorInsertar=this.lstPersonajes[i].id;
  }
}

console.log()

const obj = {
  "id":10,
  "idPersonajeEmisor": idPersonajeEmisorInsertar,
  "idPersonajeReceptor": 0,
  "idMovimiento" : 0,
  "idPosicionEscenario":0,
  "porcentajeKO":0
};
const response = await
fetch('http://127.0.0.1:8080/apiSmash/PostRegistro',{ 
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(obj)
}
);
const body = await response.text();
console.log(body);


}
  

}
