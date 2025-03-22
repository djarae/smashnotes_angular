import { Component , OnInit } from '@angular/core';
import {url_entorno} from '../../../configs/url_entorno';

@Component({
  selector: 'app-tbl-registros',
  templateUrl: './tbl-registros.component.html',
  styleUrls: ['./tbl-registros.component.css']
})
export class TblRegistrosComponent  implements OnInit {
  valor : any;
  body: string=""

  async ngOnInit() {
    console.log("apiurl =>>>>",url_entorno())
    const response = await fetch(url_entorno()+'/apiSmash/Registros');
    this.body = await response.json();
    //Muy importante , importamos el "body" a un "any" para leerlo
    this.valor=this.body;


  }


}
