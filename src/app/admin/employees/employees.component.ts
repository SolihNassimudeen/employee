import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/employeeData.service';
import { Employee } from '../../shared/employeeData.interface';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

    isAddEmployee = false;
    employeeArray: Employee[] = [];
    employeeDetails: Employee = new Employee();
    validationMap = new Map();


    constructor(public serviceData: ServiceService) { }

    ngOnInit(): void {
        this.getServiceData()
    }

    getServiceData() {
        this.serviceData.getEmployeedata().subscribe(data => {
            this.employeeArray = data;
        });
    }

    addNewToggleBtn() {
        this.isAddEmployee = !this.isAddEmployee;
    }

    addNewEmployeeSubmit() {
        this.validationCheck()
        if (!this.validationMap.size) {
            this.serviceData.employeeData.push(this.employeeDetails);
            this.getServiceData()
            this.isAddEmployee = false;
        }
    }

    validationCheck() {
        if (!this.employeeDetails.name) {
            this.validationMap.set('name', "Please enter a name.")
        }
        if (!this.employeeDetails.tag) {
            this.validationMap.set('tag', "Please select a Job tag.")
        }
        if (!this.employeeDetails.position) {
            this.validationMap.set('position', "Select a field.")
        }
        if (!this.employeeDetails.management) {
            this.validationMap.set('management', "Select a Radio button.")
        }
        if (!this.employeeDetails.emp_code) {
            this.validationMap.set('emp_code', "Please enter a employee code.")
        }
        if (!this.employeeDetails.joiningdate) {
            this.validationMap.set('joiningdate', "Please select  joining Date.")
        }
        if (!this.employeeDetails.email) {
            this.validationMap.set('email', "Please enter a email.")
        }
    }
}
