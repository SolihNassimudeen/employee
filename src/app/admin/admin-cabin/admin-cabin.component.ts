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

    adminList!: FormGroup;
    adminCount = 0;
    adminDetailsList: any[] = []
    isSubmitted = false;

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
        if (this.adminList.valid && this.adminCount) {
            this.dataService.addAdmin(this.adminList.value).subscribe((data) => {
                this.getAdminList();
                this.getAdminCount();
                (this.addModalcancel.nativeElement as HTMLButtonElement).click();
                this.adminList.reset();
                this.isSubmitted = false;
            })
        }
    }

    cancelModal() {
        this.isSubmitted = false;
    }
}
