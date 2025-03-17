//Main
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';

//Hijos
import { MatchupsComponent } from './matchups/matchups.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

//Nietos y Bis-Nietos
import {TblRegistrosComponent} from './matchups/tbl-registros/tbl-registros.component'
import {AgrRegistroComponent} from  './matchups/agr-registro/agr-registro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


@NgModule({
  declarations: [
    AppComponent,
    MatchupsComponent,
    ToolbarComponent,
    TblRegistrosComponent,
    AgrRegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule ,
    MatButtonModule     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
