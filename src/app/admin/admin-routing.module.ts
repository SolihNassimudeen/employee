import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {path:'',component:AdminComponent, children: [
    {path:'employees', component:EmployeesComponent}

  ]},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
