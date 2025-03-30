import { Component, Input,EventEmitter,Output } from '@angular/core';
import { url_entorno } from '../../../configs/url_entorno';
import { personajeService } from '../../../services/matchups/personaje.service';
import { escenarioService } from '../../../services/matchups/escenario.service';
import { registroService} from '../../../services/matchups/registro.service';

//angular material
import { MatSnackBar } from '@angular/material/snack-bar';

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
  //Inputs desde el listado
  @Input() inputIdPjReceptor!: number;
  @Input() inputIdEscenarioInput!: number;
  @Input() inputIdKOInput!: number;
  //Actualizar el componente padre
  @Output() actualizarLista = new EventEmitter<void>(); // Emitirá un evento sin datos
  constructor(private snackBar: MatSnackBar) {}

  async ngOnInit() {
    this.lstPersonajes = await new personajeService().getPersonajes();
    this.lstEscenarios = await new escenarioService().getEscenarios();
    this.selectedPersonaje = this.inputIdPjReceptor;
    this.selectedEscenario = this.inputIdEscenarioInput;
    this.porcentajeKo = this.inputIdKOInput;
  }


  async  updatePorcentajeKO() {
    console.log("Receptor ,escenario y porcentaje son: ",this.selectedPersonaje,this.selectedEscenario,this.porcentajeKo);
    const response = await new registroService().updateRegistro(
      this.selectedPersonaje,
      this.selectedEscenario,
      this.porcentajeKo
    );
    console.log("response body",response);
    console.log("antes del emit")
    this.actualizarLista.emit(); // Luego, emite el evento para actualizar la tabla
    console.log("despues del emit")
    


    console.log("Response body:", response);

  // Muestra un mensaje por 2 segundos
  this.snackBar.open(response, 'Cerrar', {
    duration: 2000, // 2 segundos
    verticalPosition: 'top', // Posición en pantalla
    horizontalPosition: 'center'
  });
  }

}
