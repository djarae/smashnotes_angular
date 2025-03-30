import { Component , Input,EventEmitter,Output} from '@angular/core';
import { registroService} from '../../../services/matchups/registro.service';
//angular material
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-eliminar-registro',
  templateUrl: './eliminar-registro.component.html',
  styleUrls: ['./eliminar-registro.component.css']
})
export class EliminarRegistroComponent {
 selectPersonaje: string[] = [];
  @Input() inputIdRegistro !: number; // ID del registro a editar
  @Output() actualizarLista = new EventEmitter<void>(); // Emitirá un evento sin datos

  constructor(private snackBar: MatSnackBar) {}


  async  deleteRegistro() {
    console.log("Ingresamos a insertar input id es : ",this.inputIdRegistro) 
    const response = await new registroService().deleteRegistro(this.inputIdRegistro);
    this.actualizarLista.emit(); // Luego, emite el evento para actualizar la tabla
    // Muestra un mensaje por 2 segundos
    this.snackBar.open(response, 'Cerrar', {
      duration: 2000, // 2 segundos
      verticalPosition: 'top', // Posición en pantalla
      horizontalPosition: 'center'
    });
   }
}
