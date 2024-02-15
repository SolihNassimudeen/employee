import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeaveManagementComponent } from './leave-management/leave-management.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AdminCabinComponent } from './admin-cabin/admin-cabin.component';

const routes: Routes = [
    {
        path: '', component: AdminComponent, children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'employees', component: EmployeesComponent },
            { path: 'leaveManagement', component: LeaveManagementComponent },
            { path: 'attendance', component: AttendanceComponent },
            { path: 'adminCabin', component: AdminCabinComponent }

        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule { }
