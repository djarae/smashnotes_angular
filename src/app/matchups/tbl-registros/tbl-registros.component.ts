import { Component , OnInit } from '@angular/core';
import {url_entorno} from '../../../configs/url_entorno';
import { registroService } from 'src/services/matchups/registro.service';

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
    const response =  await new registroService().getAllRegistros();
    this.valor = await response; this.valor = [...this.valor]; 
  }
}
