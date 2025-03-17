import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TblRegistrosComponent } from './tbl-registros/tbl-registros.component';
import { AgrRegistroComponent } from './agr-registro/agr-registro.component';



@NgModule({
  declarations: [
    TblRegistrosComponent,
    AgrRegistroComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MatchupsModule { }
