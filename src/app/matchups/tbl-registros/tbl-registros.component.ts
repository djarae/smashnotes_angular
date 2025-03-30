import { Component , OnInit } from '@angular/core';
import {url_entorno} from '../../../configs/url_entorno';

@Component({
  selector: 'app-tbl-registros',
  templateUrl: './tbl-registros.component.html',
  styleUrls: ['./tbl-registros.component.css']
})
export class TblRegistrosComponent  implements OnInit {
  valor : any;


  async ngOnInit() {
    await this.cargarRegistros()
  }

  async cargarRegistros() {
    const response = await fetch(url_entorno() + '/apiSmash/Registros');
    this.valor = await response.json();
    console.log("Registros actualizados:", this.valor);
  
    // Forzar a Angular a detectar cambios
    this.valor = [...this.valor]; 
  }


}
