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

  selectedPersonajeReceptor: any =0;  // Variable para almacenar el valor seleccionado
  selectedPersonajeEmisor : any =0;
  selectedEscenario: any = '';  // Variable para almacenar el valor seleccionado
  textboxRage: any =''
  porcentajeKo: any = '';  // Variable para almacenar el valor seleccionado

  //Inputs desde el listado
  @Input() inputIdRegistro !: number; // ID del registro a editar
  @Input() inputIdPjReceptor!: number;
  @Input() inputIdEscenarioInput!: number;
  @Input() inputIdKOInput!: number;
  //Actualizar el componente padre
  @Output() actualizarLista = new EventEmitter<void>(); // Emitirá un evento sin datos
  constructor(private snackBar: MatSnackBar) {}

  async ngOnInit() {
    this.lstPersonajes = await new personajeService().getPersonajes();
    this.lstEscenarios = await new escenarioService().getEscenarios();
    this.selectedPersonajeReceptor = this.inputIdPjReceptor;
    this.selectedEscenario = this.inputIdEscenarioInput;
    this.porcentajeKo = this.inputIdKOInput;
  }


  async  updatePorcentajeKO() {
    console.log("Receptor ,escenario y porcentaje son: ",this.inputIdRegistro,this.selectedPersonajeReceptor,this.selectedEscenario,this.porcentajeKo);
    const response = await new registroService().updateRegistro(
      this.inputIdRegistro,
      this.selectedPersonajeReceptor,
      this.selectedEscenario,
      this.porcentajeKo
    );
    
  
    this.actualizarLista.emit(); // Luego, emite el evento para actualizar la tabla
  // Muestra un mensaje por 2 segundos
  this.snackBar.open(response, 'Cerrar', {
    duration: 2000, // 2 segundos
    verticalPosition: 'top', // Posición en pantalla
    horizontalPosition: 'center'
  });
  }

}
