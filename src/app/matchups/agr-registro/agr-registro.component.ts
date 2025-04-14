import { Component,EventEmitter,Output } from '@angular/core';
import { url_entorno } from '../../../configs/url_entorno';
import { personajeService } from '../../../services/matchups/personaje.service';
import { escenarioService } from '../../../services/matchups/escenario.service';
import { registroService} from '../../../services/matchups/registro.service';


//angular material
import { MatSnackBar } from '@angular/material/snack-bar';

//importamos service de personaje y escenario
@Component({
  selector: 'app-agr-registro',
  templateUrl: './agr-registro.component.html',
  styleUrls: ['./agr-registro.component.css']
})
export class AgrRegistroComponent {
  lstPersonajes: any;
  lstEscenarios: any;

  selectedPersonajeReceptor: any =0;  // Variable para almacenar el valor seleccionado
  selectedPersonajeEmisor : any =0;
  selectedEscenario: any = '';  // Variable para almacenar el valor seleccionado
  textboxRage: any =''
  porcentajeKo: any = '';  // Variable para almacenar el valor seleccionado


    //Actualizar el componente padre
    @Output() actualizarLista = new EventEmitter<void>(); // Emitirá un evento sin datos
    constructor(private snackBar: MatSnackBar) {}

  async ngOnInit() {
    this.lstPersonajes = await new personajeService().getPersonajes();
    this.lstEscenarios = await new escenarioService().getEscenarios();
  }

  async addNuevoPorcentajeKO() {
   console.log("Ingresamos a insertar ");
   const response = await new registroService().insertarRegistro(this.selectedPersonajeReceptor,this.selectedEscenario,this.porcentajeKo);
   
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
