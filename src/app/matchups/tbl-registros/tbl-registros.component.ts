import { Component, OnInit } from '@angular/core';
import { url_entorno } from '../../../configs/url_entorno';
import { registroService } from 'src/services/matchups/registro.service';

@Component({
  selector: 'app-tbl-registros',
  templateUrl: './tbl-registros.component.html',
  styleUrls: ['./tbl-registros.component.css']
})
export class TblRegistrosComponent implements OnInit {
  LstRegistros: any;

  //filtros:
  filtroEmisor: any;
  filtroReceptor: any;
  filtroMov: any;
  filtroRage: any;
  filtroPosicion: any;
  filtroStage: any;
  filtroConDI: any;
  filtroSinDI: any;

  async ngOnInit() {
    // Limpiar filtros al inicializar
    this.filtroEmisor = null;
    this.filtroReceptor = null;
    this.filtroMov = null;
    this.filtroRage = null;
    this.filtroPosicion = null;
    this.filtroStage = null;

    await this.cargarRegistros();
  }

  async cargarRegistros() {
    console.log("Inicio cargar registros")
    console.log("this filtro emisor es ", this.filtroEmisor)
    console.log("this filtro receptor es ", this.filtroReceptor)
    console.log("this filtro mov es ", this.filtroMov)
    console.log("this filtro rage es ", this.filtroRage)
    console.log("this filtro posicion es ", this.filtroPosicion)
    console.log("this filtro stage es ", this.filtroStage)
    const response = await new registroService().getAllRegistros(
      this.filtroEmisor,
      this.filtroReceptor,
      this.filtroRage,
      this.filtroPosicion,
      this.filtroStage,
      this.filtroMov
    );
    this.LstRegistros = await response; this.LstRegistros = [...this.LstRegistros];
    console.log(this.LstRegistros, "LstRegistros");
  }
}
