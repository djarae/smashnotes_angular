import { Component } from '@angular/core';
import axios from "axios";
@Component({
  selector: 'app-matchups',
  templateUrl: './matchups.component.html',
  styleUrls: ['./matchups.component.css']
})
export class MatchupsComponent {
  async probarGETConexionApiSpringboot() {
    console.log("boton springboot");
    const response = await fetch('http://127.0.0.1:8080/apiSmash');
    const body = await response.text();
    console.log(body);
  }
  async probarGetConObjetos() {
    console.log("boton springboot");
    const response = await fetch('http://127.0.0.1:8080/apiSmash/Object');
    const body = await response.text();
    console.log(body);
  }
  async probarPOSTConexionApiSpringboot() {
    const response = await fetch('http://127.0.0.1:8080/apiSmash/holapost', {
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
      fetch('http://127.0.0.1:8080/apiSmash/holapostBody', {
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
