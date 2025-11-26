import { Component,EventEmitter,Output } from '@angular/core';
import { url_entorno } from '../../../configs/url_entorno';
import { personajeService } from '../../../services/matchups/personaje.service';
import { escenarioService } from '../../../services/matchups/escenario.service';
import { movimientoService } from '../../../services/matchups/movimiento.service';
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
  lstMovimientos: any;

  selectedPersonajeReceptor: any =0;  // Variable para almacenar el valor seleccionado
  selectedPersonajeEmisor : any =0;
  selectedEscenario: any = '';  // Variable para almacenar el valor seleccionado
  selectedMovimiento: any = '';  // Variable para almacenar el valor seleccionado
  
  textboxPosicion: any = '';  // Variable para almacenar el valor seleccionado
  textboxRage: any =''
  chkDiOptimo: boolean = false;
  chkDiNinguno: boolean = false;
  porcentajeKo: any = '';  // Variable para almacenar el valor seleccionado


    //Actualizar el componente padre
    @Output() actualizarLista = new EventEmitter<void>(); // Emitirá un evento sin datos
    constructor(private snackBar: MatSnackBar) {}

  async ngOnInit() {
    this.lstPersonajes = await new personajeService().getPersonajes();
    this.lstEscenarios = await new escenarioService().getEscenarios();
    this.lstMovimientos = await new movimientoService().getMovimientos();


  }

  async addNuevoPorcentajeKO() {
   console.log("Ingresamos a insertar ");
   let diFinal= false ;
   if(this.chkDiOptimo){diFinal=true; }
   const response = await new registroService().insertarRegistro(this.selectedPersonajeEmisor,this.selectedPersonajeReceptor,this.selectedEscenario,this.selectedMovimiento,this.porcentajeKo,this.textboxRage,diFinal,this.textboxPosicion);
   
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

  cambiarDI(di:boolean){
    if (di){
      this.chkDiOptimo=true;
      this.chkDiNinguno=false;
    }else{
      this.chkDiOptimo=false;
      this.chkDiNinguno=true;      
    }  
  }


}
