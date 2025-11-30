import { Component, Input, EventEmitter, Output } from '@angular/core';
import { url_entorno } from '../../../configs/url_entorno';
import { personajeService } from '../../../services/matchups/personaje.service';
import { escenarioService } from '../../../services/matchups/escenario.service';
import { registroService } from '../../../services/matchups/registro.service';
import { movimientoService } from 'src/services/matchups/movimiento.service';
import { comboService } from '../../../services/matchups/combo.service';
import { posicionService } from '../../../services/matchups/posicion.service';
import { AtaquePropiedadService } from '../../../services/matchups/ataque-propiedad.service';
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
  lstCombos: any;
  lstPosiciones: any;
  lstAtaquePropiedades: any;
  //Bindings de los select

  selectedPersonajeReceptor: any = 0;  // Variable para almacenar el valor seleccionado
  selectedPersonajeEmisor: any = 0;
  selectedMovimiento: any = '';
  selectedCombo: any = '';
  selectedPropiedadAtaque: any = '';
  selectedPosicion: any = 0;
  selectedEscenario: any = 0;  // Variable para almacenar el valor seleccionado
  textboxRage: any = 0;
  chkDiOptimo: boolean = false;
  chkDiNinguno: boolean = false;
  porcentajeKo: any = 0;  // Variable para almacenar el valor seleccionado

  //Inputs desde el listado
  @Input() inputIdRegistro !: number; // ID del registro a editar
  @Input() inputIdPjEmisor!: number;
  @Input() inputIdPjReceptor!: number;
  @Input() inputIdEscenario!: number;
  @Input() inputIdMovimiento!: number;
  @Input() inputIdAtaque!: number;
  @Input() inputIdCombo!: number;
  @Input() inputIdPosicion!: number;
  @Input() inputIdKO!: number;
  @Input() inputRage!: number; // Rage del personaje receptor
  @Input() inputIdPropiedadAtaque!: number;
  //Actualizar el componente padre
  @Output() actualizarLista = new EventEmitter<void>(); // Emitirá un evento sin datos
  constructor(private snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.lstPersonajes = await new personajeService().getPersonajes();
    this.lstEscenarios = await new escenarioService().getEscenarios();
    this.lstMovimientos = await new movimientoService().getMovimientos();
    this.lstCombos = await new comboService().getCombos();
    this.lstPosiciones = await new posicionService().getPosiciones();
    this.lstAtaquePropiedades = await new AtaquePropiedadService().getAtaquePropiedades();
    this.selectedPersonajeEmisor = this.inputIdPjEmisor;
    this.selectedPersonajeReceptor = this.inputIdPjReceptor;
    this.selectedEscenario = this.inputIdEscenario;

    // Logic to set initial selection
    if (this.inputIdCombo && this.inputIdCombo > 0) {
      this.selectedCombo = this.inputIdCombo;
      this.selectedMovimiento = '';
    } else {
      this.selectedMovimiento = this.inputIdMovimiento;
      this.selectedCombo = '';
    }

    this.selectedPosicion = this.inputIdPosicion;
    this.porcentajeKo = this.inputIdKO;
    this.textboxRage = this.inputRage; // Rage del personaje receptor
    this.selectedPropiedadAtaque = this.inputIdPropiedadAtaque;
  }


  async updatePorcentajeKO() {
    let diFinal = false;
    if (this.chkDiOptimo) { diFinal = true; }
    console.log("Receptor ,escenario y porcentaje son: ", this.inputIdRegistro, this.selectedPersonajeEmisor, this.selectedPersonajeReceptor, this.selectedMovimiento, this.selectedEscenario, this.porcentajeKo, this.textboxRage, diFinal);
    // Determinar idAtaque y tipoAtaque basado en la selección
    let idAtaque = null;
    let tipoAtaque = null;

    if (this.selectedMovimiento && this.selectedMovimiento !== '') {
      idAtaque = this.selectedMovimiento;
      tipoAtaque = '1'; // Tipo movimiento
    } else if (this.selectedCombo && this.selectedCombo !== '') {
      idAtaque = this.selectedCombo;
      tipoAtaque = '2'; // Tipo combo
    }

    const response = await new registroService().updateRegistro(
      this.inputIdRegistro,
      this.selectedPersonajeEmisor,
      this.selectedPersonajeReceptor,
      this.selectedEscenario,
      idAtaque,
      tipoAtaque,
      this.selectedPropiedadAtaque,
      this.selectedPosicion,
      this.porcentajeKo,
      this.textboxRage,
      this.chkDiOptimo ? true : false // Convertimos a booleano
    );
    this.actualizarLista.emit(); // Luego, emite el evento para actualizar la tabla
    // Muestra un mensaje por 2 segundos
    this.snackBar.open(response, 'Cerrar', {
      duration: 2000, // 2 segundos
      verticalPosition: 'top', // Posición en pantalla
      horizontalPosition: 'center'
    });
  }

  cambiarDI(di: boolean) {
    if (di) {
      this.chkDiOptimo = true;
      this.chkDiNinguno = false;
    } else {
      this.chkDiOptimo = false;
      this.chkDiNinguno = true;
    }
  }

  onMovimientoChange() {
    if (this.selectedMovimiento) {
      this.selectedCombo = '';  // Limpiar combo si se selecciona movimiento
    }
  }

  onComboChange() {
    if (this.selectedCombo) {
      this.selectedMovimiento = '';  // Limpiar movimiento si se selecciona combo
    }
  }

}
