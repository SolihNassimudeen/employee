import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/service/employeeData.service';

@Component({
    selector: 'app-admin-cabin',
    templateUrl: './admin-cabin.component.html',
    styleUrls: ['./admin-cabin.component.scss']
})
export class AdminCabinComponent implements OnInit {

    @ViewChild('addModalcancel') addModalcancel!: ElementRef;
    @ViewChild('upadateAdminModalcancel') upadateAdminModalcancel!: ElementRef;

    adminList!: FormGroup;
    adminCount = 0;
    adminDetailsList: any[] = []
    isSubmitted = false;
    selectedSlno = -1;

    constructor(private dataService: ServiceService, private fb: FormBuilder) { }

    ngOnInit(): void {
        this.getAdminCount();
        this.getAdminList();
        this.formValidation();
    }

    formValidation(): void {
        this.adminList = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            position: ['', [Validators.required]],
            username: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(3)]]
        });
    }

    getAdminList() {
        this.dataService.getAdminDetails().subscribe((data) => {
            this.adminDetailsList = data;
        })
    }

    getAdminCount() {
        this.dataService.adminsCount().subscribe((count) => {
            this.adminCount = count;
        })
    }

    addNewAdmin() {
        this.isSubmitted = true;
        if (this.adminList.valid && this.adminCount < 6) {
            this.dataService.addAdmin(this.adminList.value).subscribe((data) => {
                this.getAdminList();
                this.getAdminCount();
                (this.addModalcancel.nativeElement as HTMLButtonElement).click();
                this.adminList.reset();
                this.isSubmitted = false;
            })
        } else {
            alert("entered data not in valid form or admin space is full")
        }
    }

    updateRequest(slno: number) {
        this.selectedSlno = slno;
        this.dataService.getAnAdmin(slno).subscribe((data) => {
            this.adminList.patchValue(data);
        })
    }

    updateSubmit() {
        this.isSubmitted = true;
        if (this.adminList.valid) {
            this.dataService.updateAnAdmin(this.selectedSlno, this.adminList.value).subscribe(() => {
                this.getAdminCount();
                this.getAdminList();
                (this.upadateAdminModalcancel.nativeElement as HTMLButtonElement).click();
                this.selectedSlno = -1;
                this.isSubmitted = false;
                this.adminList.reset();
            })
        }
    }

    deleteRequest(slno: number) {
        this.selectedSlno = slno;
    }

    deleteAdmin() {
        if (this.adminCount != 1) {
            this.dataService.adminDelete(this.selectedSlno).subscribe(() => {
                this.selectedSlno = -1;
                this.getAdminList();
                this.getAdminCount();
            })
        } else {
            alert("It is mandatory to have at least one admin")
        }
    }

    cancelModal() {
        this.isSubmitted = false;
        this.selectedSlno - 1;
    }
}
