import { Component } from '@angular/core';

@Component({
  selector: 'app-eliminar-registro',
  templateUrl: './eliminar-registro.component.html',
  styleUrls: ['./eliminar-registro.component.css']
})
export class EliminarRegistroComponent {
 selectPersonaje: string[] = [];
  lstPersonajes: any;
  lstEscenarios: any;

  selectedPersonaje: any =0;  // Variable para almacenar el valor seleccionado
  selectedEscenario: any = '';  // Variable para almacenar el valor seleccionado
  porcentajeKo: any = '';  // Variable para almacenar el valor seleccionado

  

  async  deleteRegistro() {
    console.log("Ingresamos a insertar ");
    // const response = await new registroService().insertarRegistro(this.selectedPersonaje,this.selectedEscenario,this.porcentajeKo);
   }
}
