import { Component, EventEmitter, Output } from '@angular/core';
import { url_entorno } from '../../../configs/url_entorno';
import { personajeService } from '../../../services/matchups/personaje.service';
import { escenarioService } from '../../../services/matchups/escenario.service';
import { movimientoService } from '../../../services/matchups/movimiento.service';
import { comboService } from '../../../services/matchups/combo.service';
import { posicionService } from '../../../services/matchups/posicion.service';
import { registroService } from '../../../services/matchups/registro.service';
import { AtaquePropiedadService } from '../../../services/matchups/ataque-propiedad.service';
import { ataqueService } from '../../../services/matchups/ataque.service';


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
  lstCombos: any;
  lstPosiciones: any;
  lstPosicionesCompleto: any;
  lstAtaquePropiedades: any;
  lstAtaques: any;

  selectedPersonajeReceptor: any = 0;  // Variable para almacenar el valor seleccionado
  selectedPersonajeEmisor: any = 0;
  selectedEscenario: any = '';  // Variable para almacenar el valor seleccionado
  selectedMovimiento: any = '';  // Variable para almacenar el valor seleccionado
  selectedCombo: any = '';  // Variable para almacenar el valor seleccionado
  selectedPropiedadAtaque: any = ''; // Variable para almacenar la propiedad seleccionada
  selectedPosicion: any = 1;  // Por defecto Main Stage (id 1)

  textboxRage: any = ''
  chkDiOptimo: boolean = false;
  chkDiNinguno: boolean = false;
  porcentajeKo: any = '';  // Variable para almacenar el valor seleccionado


  //Actualizar el componente padre
  @Output() actualizarLista = new EventEmitter<void>(); // Emitirá un evento sin datos
  constructor(private snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.lstPersonajes = await new personajeService().getPersonajes();
    this.lstEscenarios = await new escenarioService().getEscenarios();
    this.lstMovimientos = await new movimientoService().getMovimientos();
    this.lstCombos = await new comboService().getCombos();
    this.lstPosicionesCompleto = await new posicionService().getPosiciones();
    this.lstPosiciones = this.lstPosicionesCompleto;
    this.lstAtaquePropiedades = await new AtaquePropiedadService().getAtaquePropiedades();
    this.lstAtaques = await new ataqueService().getAtaques();

    console.log("=== ATAQUES ===");
    console.log(this.lstAtaques);
    console.log("=== MOVIMIENTOS ===");
    console.log(this.lstMovimientos);
    console.log("=== COMBOS ===");
    console.log(this.lstCombos);
    console.log("=== POSICIONES ===");
    console.log(this.lstPosiciones);



  }

  async addNuevoPorcentajeKO() {
    let diFinal = false;
    if (this.chkDiOptimo) { diFinal = true; }

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

    const response = await new registroService().insertarRegistro(
      this.selectedPersonajeEmisor,
      this.selectedPersonajeReceptor,
      this.selectedEscenario,
      idAtaque,
      tipoAtaque,
      this.selectedPropiedadAtaque,
      this.selectedPosicion,
      this.porcentajeKo,
      this.textboxRage,
      diFinal
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
      console.log("Movimiento Seleccionado ID: ", this.selectedMovimiento);

      const ataqueSeleccionado = this.lstAtaques.find((a: any) => a.idMovimiento && a.idMovimiento.id == this.selectedMovimiento);
      if (ataqueSeleccionado) {
        console.log("Ataque ID asociado (Movimiento): ", ataqueSeleccionado.id);
        console.log("Eje Ataque: ", ataqueSeleccionado.eje);

        // Filter positions based on axis
        if (ataqueSeleccionado.eje) {
          this.lstPosiciones = this.lstPosicionesCompleto.filter((p: any) => p.eje === ataqueSeleccionado.eje);
          // Optional: Reset selected position if it's not in the filtered list
          // this.selectedPosicion = this.lstPosiciones.length > 0 ? this.lstPosiciones[0].id : null; 
        } else {
          // If no axis, maybe show all?
          this.lstPosiciones = this.lstPosicionesCompleto;
        }
      }
    } else {
      // Reset if no movement selected
      this.lstPosiciones = this.lstPosicionesCompleto;
    }
  }

  onComboChange() {
    if (this.selectedCombo) {
      this.selectedMovimiento = '';  // Limpiar movimiento si se selecciona combo
      console.log("Combo Seleccionado ID: ", this.selectedCombo);

      const ataqueSeleccionado = this.lstAtaques.find((a: any) => a.idCombo && a.idCombo.id == this.selectedCombo);
      if (ataqueSeleccionado) {
        console.log("Ataque ID asociado (Combo): ", ataqueSeleccionado.id);
        console.log("Eje Ataque: ", ataqueSeleccionado.eje);

        // Filter positions based on axis
        if (ataqueSeleccionado.eje) {
          this.lstPosiciones = this.lstPosicionesCompleto.filter((p: any) => p.eje === ataqueSeleccionado.eje);
        } else {
          this.lstPosiciones = this.lstPosicionesCompleto;
        }

      }
    } else {
      this.lstPosiciones = this.lstPosicionesCompleto;
    }
  }
}
