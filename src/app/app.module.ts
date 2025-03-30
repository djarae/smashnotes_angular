//Main
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


//Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

//Hijos
import { MatchupsComponent } from './matchups/matchups.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

//Nietos y Bis-Nietos
import {TblRegistrosComponent} from './matchups/tbl-registros/tbl-registros.component'
import {AgrRegistroComponent} from  './matchups/agr-registro/agr-registro.component';
import { EditarRegistroComponent } from './matchups/editar-registro/editar-registro.component';
import { EliminarRegistroComponent } from './matchups/eliminar-registro/eliminar-registro.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    MatchupsComponent,
    ToolbarComponent,
    TblRegistrosComponent,
    AgrRegistroComponent,
    EditarRegistroComponent,
    EliminarRegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule ,
    MatButtonModule,
    MatSnackBarModule     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
