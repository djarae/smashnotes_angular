import { Component } from '@angular/core';
import {url_entorno} from '../../configs/url_entorno';


@Component({
  selector: 'app-matchups',
  templateUrl: './matchups.component.html',
  styleUrls: ['./matchups.component.css']
})
export class MatchupsComponent {
  async probarGETConexionApiSpringboot() {
    console.log("boton springboot");
    const response = await fetch(url_entorno()+'/apiSmash');
    const body = await response.text();
    console.log(body);
  }
  async probarGetConObjetos() {
    console.log("boton springboot");
    const response = await fetch(url_entorno()+'/apiSmash/Object');
    const body = await response.text();
    console.log(body);
  }
  async probarPOSTConexionApiSpringboot() {
    const response = await fetch(url_entorno()+'/apiSmash/holapost', {
      method: "POST"
    });
    const body = await response.text();
    console.log(body);
  }
  async probarPOSTConexionApiSpringbootConBody() {
    console.log("boton springboot");
    const obj = {
      "itemNo": 4,
      "itemDesc": "Item4",
      "itemprice": 400
    };
    const response = await
      fetch(url_entorno()+'/apiSmash/holapostBody', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
      }
      );
    const body = await response.text();
    console.log(body);
  }

}
