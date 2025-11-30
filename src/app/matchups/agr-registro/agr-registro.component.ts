import { Component, EventEmitter, Output } from '@angular/core';
import { url_entorno } from '../../../configs/url_entorno';
import { personajeService } from '../../../services/matchups/personaje.service';
import { escenarioService } from '../../../services/matchups/escenario.service';
import { movimientoService } from '../../../services/matchups/movimiento.service';
import { comboService } from '../../../services/matchups/combo.service';
import { posicionService } from '../../../services/matchups/posicion.service';
import { registroService } from '../../../services/matchups/registro.service';
import { AtaquePropiedadService } from '../../../services/matchups/ataque-propiedad.service';


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
  lstAtaquePropiedades: any;

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
    this.lstPosiciones = await new posicionService().getPosiciones();
    this.lstAtaquePropiedades = await new AtaquePropiedadService().getAtaquePropiedades();
    console.log("lstCombos cargados:", this.lstCombos);
    console.log("lstPosiciones cargadas:", this.lstPosiciones);
    console.log("lstAtaquePropiedades cargadas:", this.lstAtaquePropiedades);
  }

  async addNuevoPorcentajeKO() {
    console.log("Ingresamos a insertar ");
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

    console.log("=== DATOS A ENVIAR AL BACKEND ===");
    console.log("Emisor:", this.selectedPersonajeEmisor);
    console.log("Receptor:", this.selectedPersonajeReceptor);
    console.log("Escenario:", this.selectedEscenario);
    console.log("idAtaque:", idAtaque);
    console.log("tipoAtaque:", tipoAtaque);
    console.log("idPropiedadAtaque:", this.selectedPropiedadAtaque);
    console.log("Posicion:", this.selectedPosicion);
    console.log("Porcentaje KO:", this.porcentajeKo);
    console.log("Rage:", this.textboxRage);
    console.log("DI:", diFinal);
    console.log("=================================");

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

    console.log("response body", response);
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
