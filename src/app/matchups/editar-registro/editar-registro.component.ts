import { Component, Input,EventEmitter,Output } from '@angular/core';
import { url_entorno } from '../../../configs/url_entorno';
import { personajeService } from '../../../services/matchups/personaje.service';
import { escenarioService } from '../../../services/matchups/escenario.service';
import { registroService} from '../../../services/matchups/registro.service';
import { movimientoService } from 'src/services/matchups/movimiento.service';
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
  lstMovimientos: any;
  //Bindings de los select

  selectedPersonajeReceptor: any =0;  // Variable para almacenar el valor seleccionado
  selectedPersonajeEmisor : any =0;
  selectedMovimiento:any=0;
  selectedEscenario: any = 0;  // Variable para almacenar el valor seleccionado
    textboxPosicion: any = '';  // Variable para almacenar el valor seleccionado
  textboxRage: any =0;
  chkDiOptimo: boolean = false;
  chkDiNinguno: boolean = false;
  porcentajeKo: any = 0;  // Variable para almacenar el valor seleccionado

  //Inputs desde el listado
  @Input() inputIdRegistro !: number; // ID del registro a editar
  @Input() inputIdPjEmisor!: number;
  @Input() inputIdPjReceptor!: number;
  @Input() inputIdEscenario!: number;
  @Input() inputIdMovimiento!: number;
  @Input() inputIdPosicion!: number;
  @Input() inputIdKO!: number;
  @Input() inputRage!: number; // Rage del personaje receptor
  //Actualizar el componente padre
  @Output() actualizarLista = new EventEmitter<void>(); // Emitirá un evento sin datos
  constructor(private snackBar: MatSnackBar) {}

  async ngOnInit() {
    this.lstPersonajes = await new personajeService().getPersonajes();
    this.lstEscenarios = await new escenarioService().getEscenarios();
    this.lstMovimientos = await new movimientoService().getMovimientos();
    this.selectedPersonajeEmisor = this.inputIdPjEmisor;
    this.selectedPersonajeReceptor = this.inputIdPjReceptor;
    this.selectedEscenario = this.inputIdEscenario;
    this.selectedMovimiento = this.inputIdMovimiento;
    this.textboxPosicion = this.inputIdPosicion;
    this.porcentajeKo = this.inputIdKO;
    this.textboxRage = this.inputRage; // Rage del personaje receptor
  }


  async  updatePorcentajeKO() {
    let diFinal= false ;
    if(this.chkDiOptimo){diFinal=true;}
    console.log("Receptor ,escenario y porcentaje son: ",this.inputIdRegistro,this.selectedPersonajeEmisor,this.selectedPersonajeReceptor,this.selectedMovimiento,this.selectedEscenario,this.porcentajeKo,this.textboxRage,diFinal,this.textboxPosicion);
    const response = await new registroService().updateRegistro(
      this.inputIdRegistro,
      this.selectedPersonajeEmisor,
      this.selectedPersonajeReceptor,
      this.selectedEscenario,
      this.selectedMovimiento,
      this.porcentajeKo,
      this.textboxRage,
      this.chkDiOptimo ? true : false, // Convertimos a booleano
           this.textboxPosicion,
    );
    this.actualizarLista.emit(); // Luego, emite el evento para actualizar la tabla
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
