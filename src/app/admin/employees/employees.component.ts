import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from 'src/app/service/employeeData.service';
import { Employee } from '../../shared/employeeData.interface';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

    @ViewChild('addModalcancel') addModalcancel!: ElementRef;
    @ViewChild('updateModalcancel') updateModalcancel!: ElementRef;
    employeeArray: Employee[] = [];
    searchEmployeeArray: Employee[] = [];
    searchingName: string = '';
    employeeDetails: any = new Employee();
    validationMap = new Map();
    emp_CodeForDeletion: any;
    emp_Count: number | null = null;
    isUpdationEmployeeOn = true;
    emp_codeFound = true;



    constructor(public serviceData: ServiceService) { }

    ngOnInit(): void {
        this.getServiceData()
    }

    getServiceData() {
        this.serviceData.getEmployeedata().subscribe(data => {
            this.employeeArray = data;
            this.emp_Count = this.employeeArray.length
        });
    }

    searchAnEmployee() {
        this.searchEmployeeArray = this.serviceData.searchAnEmployee(this.searchingName.trim());
    }

    addNewEmployeeSubmit() {
        this.validationMap.clear()
        this.defaultImgPath()
        this.validationCheck()
        if (!this.validationMap.size) {
            this.serviceData.employeeData.push(this.employeeDetails);
            this.getServiceData();
            (this.addModalcancel.nativeElement as HTMLButtonElement).click();
            this.employeeDetails = new Employee;
        }
    }

    beforeUpdation(empCode: any) {
        this.employeeDetails = this.serviceData.getDataForUpdation(empCode);
        this.isUpdationEmployeeOn = false
    }

    updateEmployeeSubmit() {
        this.validationMap.clear()
        this.defaultImgPath()
        this.validationCheck()
        if (!this.validationMap.size) {
            const index = this.getIndexFromEmployees(this.employeeDetails.emp_code)
            this.serviceData.employeeData[index] = this.employeeDetails
            this.getServiceData();
            (this.updateModalcancel.nativeElement as HTMLButtonElement).click();
            this.employeeDetails = new Employee;
            this.isUpdationEmployeeOn = false;
        }
    }

    modalCancel() {
        this.employeeDetails = new Employee;
        this.validationMap.clear();
        this.isUpdationEmployeeOn = true;
    }

    beforeDeletionConformed(empCode: any) {
        this.emp_CodeForDeletion = empCode;
    }

    afterDeletionConformed() {
        this.serviceData.deleteEmployee(this.emp_CodeForDeletion);
        // this.getServiceData();
    }

    getIndexFromEmployees(emp_code: any) {
        return this.serviceData.employeeData.findIndex(obj => obj.emp_code === emp_code)
    }

    validationCheck() {
        if (!this.employeeDetails.name) {
            this.validationMap.set('name', "Please enter a name.");
        }
        if (!this.employeeDetails.tag) {
            this.validationMap.set('tag', "Please select a Job tag.");
        }
        if (!this.employeeDetails.position) {
            this.validationMap.set('position', "Select a field.");
        }
        if (!this.employeeDetails.management) {
            this.validationMap.set('management', "Select a Radio button.");
        }
        if (!this.employeeDetails.emp_code) {
            this.validationMap.set('emp_code', "Please enter a employee code.");
        }
        if (this.isUpdationEmployeeOn) {
            if (this.employeeDetails.emp_code) {
                this.empCodeValidation()
                if (this.emp_codeFound) {
                    this.validationMap.set('emp_code', "Emp code already exist")
                }
            }
        }
        if (!this.employeeDetails.joiningdate) {
            this.validationMap.set('joiningdate', "Please select  joining Date.");
        }
        if (this.employeeDetails.email) {
            if (!this.validateEmail()) {
                this.validationMap.set('email', "Please enter a valid email.");
            }
        }
        if (!this.employeeDetails.email) {
            this.validationMap.set("email", "Please enter a email");
        }
    }
    defaultImgPath() {
        if (!this.employeeDetails.imgurl) {
            this.employeeDetails.imgurl = '/assets/employeeProfile/default.png'
        }
    }
    validateEmail() {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.employeeDetails.email);
    }
    empCodeValidation() {
        this.serviceData.empCodeValidation(this.employeeDetails.emp_code).subscribe((data) => {
            if (data) {
                this.emp_codeFound = true;

            } else {
                this.emp_codeFound = false;
            }
        })
    }
}
