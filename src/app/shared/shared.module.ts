import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommingSoonComponent } from './comming-soon/comming-soon.component';
import { LoaderComponent } from './loader/loader.component';
import { PaginatorComponent } from './paginator/paginator.component';



@NgModule({
  declarations: [
    CommingSoonComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule
  ], exports: [CommingSoonComponent, PaginatorComponent]
})
export class SharedModule { }
