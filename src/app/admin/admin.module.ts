import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavBarComponent } from './navBar/navBar.component';
import { EmployeesComponent } from './employees/employees.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeaveManagementComponent } from './leave-management/leave-management.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AdminCabinComponent } from './admin-cabin/admin-cabin.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
    declarations: [
        NavBarComponent,
        EmployeesComponent,
        AdminComponent,
        DashboardComponent,
        LeaveManagementComponent,
        AttendanceComponent,
        AdminCabinComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        MatPaginatorModule,
    ]
})
export class AdminModule { }
