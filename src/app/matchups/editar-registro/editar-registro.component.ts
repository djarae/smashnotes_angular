import { Component, Input } from '@angular/core';
import { url_entorno } from '../../../configs/url_entorno';
import { personajeService } from '../../../services/matchups/personaje.service';
import { escenarioService } from '../../../services/matchups/escenario.service';
import { registroService} from '../../../services/matchups/registro.service';

@Component({
  selector: 'app-editar-registro',
  templateUrl: './editar-registro.component.html',
  styleUrls: ['./editar-registro.component.css']
})
export class EditarRegistroComponent {
  selectPersonaje: string[] = [];
  lstPersonajes: any;
  lstEscenarios: any;
  //Bindings de los select
  selectedPersonaje: any =0;  // Variable para almacenar el valor seleccionado
  selectedEscenario: any = '';  // Variable para almacenar el valor seleccionado
  porcentajeKo: any = '';  // Variable para almacenar el valor seleccionado
  //Props desde el listado
  @Input() idPjReceptor!: number;


  async ngOnInit() {
    this.lstPersonajes = await new personajeService().getPersonajes();
    this.lstEscenarios = await new escenarioService().getEscenarios();
    this.selectedPersonaje = this.idPjReceptor;
  }

  async  updatePorcentajeKO() {
    console.log("Ingresamos a insertar ");
    console.log("Receptor ,escenario y porcentaje son: ",this.selectedPersonaje,this.selectedEscenario,this.porcentajeKo);
    //  const response = await new registroService().insertarRegistro(this.selectedPersonaje,this.selectedEscenario,this.porcentajeKo);
   
  }

}
