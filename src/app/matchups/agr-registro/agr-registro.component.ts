import { Component } from '@angular/core';
import { url_entorno } from '../../../configs/url_entorno';
import { personajeService } from '../../../services/matchups/personaje.service';
import { escenarioService } from '../../../services/matchups/escenario.service';
import { registroService} from '../../../services/matchups/registro.service';

//importamos service de personaje y escenario
@Component({
  selector: 'app-agr-registro',
  templateUrl: './agr-registro.component.html',
  styleUrls: ['./agr-registro.component.css']
})
export class AgrRegistroComponent {
  selectPersonaje: string[] = [];
  lstPersonajes: any;
  lstEscenarios: any;

  selectedPersonaje: any =0;  // Variable para almacenar el valor seleccionado
  selectedEscenario: any = '';  // Variable para almacenar el valor seleccionado
  porcentajeKo: any = '';  // Variable para almacenar el valor seleccionado


  async ngOnInit() {
    this.lstPersonajes = await new personajeService().getPersonajes();
    this.lstEscenarios = await new escenarioService().getEscenarios();
  }

  async addNuevoPorcentajeKO() {
   console.log("Ingresamos a insertar ");
   const response = await new registroService().insertarRegistro(this.selectedPersonaje,this.selectedEscenario,this.porcentajeKo);
  }


}
