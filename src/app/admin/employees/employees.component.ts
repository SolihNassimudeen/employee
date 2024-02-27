import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from 'src/app/service/employeeData.service';
import { Employee } from '../../shared/employeeData.interface';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('void', style({ opacity: 0 })),
            transition(':enter, :leave', [
                animate(3000)
            ]),
        ]),
    ]
})

export class EmployeesComponent implements OnInit {

    @ViewChild('addModalcancel') addModalcancel!: ElementRef;
    @ViewChild('updateModalcancel') updateModalcancel!: ElementRef;

    isShowAlert = false;
    employeeList: Employee[] = [];
    searchEmployeeList: Employee[] = [];
    searchingName: string = '';
    employeeDetails: any = new Employee();
    validationMap = new Map();
    emp_CodeForDeletion: any;
    emp_Count: number | null = null;


    constructor(public serviceData: ServiceService) { }

    ngOnInit(): void {
        this.getServiceData()
    }

    getServiceData() {
        this.serviceData.getEmployeedata().subscribe(data => {
            this.employeeList = data;
            this.emp_Count = this.employeeList.length
        });
    }

    showAlertMessage() {
        this.isShowAlert = true;
        setTimeout(() => {
            this.isShowAlert = false;
        }, 3000);
    }

    searchAnEmployee() {
        this.serviceData.searchAnEmployee(this.searchingName.trim()).subscribe((data) => {
            this.searchEmployeeList = data;
        })
    }

    addNewEmployeeSubmit() {
        this.validationMap.clear();
        this.defaultImg();
        this.validationCheck();
        if (this.employeeDetails.emp_code) {
            this.empCodeValidation();
        }
    }

    beforeUpdation(empCode: any) {
        this.serviceData.getDataForUpdation(empCode).subscribe((data) => {
            this.employeeDetails = data;
        })
    }

    updateEmployeeSubmit() {
        this.validationMap.clear();
        this.defaultImg();
        this.validationCheck();
        if (!this.validationMap.size) {
            this.serviceData.setupdateEmployeedata(this.employeeDetails.emp_code, this.employeeDetails).subscribe(() => {
                this.getServiceData();
                this.searchAnEmployee();
                (this.updateModalcancel.nativeElement as HTMLButtonElement).click();
                this.employeeDetails = new Employee;
                this.showAlertMessage();
            })
        }
    }

    cancelModal() {
        this.employeeDetails = new Employee;
        this.validationMap.clear();
    }

    beforeDeletionConformed(empCode: any) {
        this.emp_CodeForDeletion = empCode;
    }

    afterDeletionConformed() {
        this.serviceData.deleteEmployee(this.emp_CodeForDeletion).subscribe(() => {
            this.getServiceData();
            this.searchAnEmployee();
            this.showAlertMessage();
        });
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
    defaultImg() {
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
                this.validationMap.set('emp_code', "Emp code already exist")
            } else {
                if (!this.validationMap.size) {
                    this.serviceData.addEmployeedata(this.employeeDetails).subscribe(() => {
                        this.getServiceData();
                        (this.addModalcancel.nativeElement as HTMLButtonElement).click();
                        this.employeeDetails = new Employee;
                        this.showAlertMessage();
                    })
                }
            }
        })
    }
}