import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { NavBarComponent } from './navBar/navBar.component';
import { EmployeesComponent } from './employees/employees.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeaveManagementComponent } from './leave-management/leave-management.component';



@NgModule({
  declarations: [
    NavBarComponent,
    EmployeesComponent,
    AdminComponent,
    DashboardComponent,
    LeaveManagementComponent
  ],
  imports: [
    CommonModule,AdminRoutingModule
  ]
})
export class AdminModule { }
