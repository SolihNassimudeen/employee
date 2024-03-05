import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service/employeeData.service';
import { AuthService } from '../Guard/AuthService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    @ViewChild('verificationModalcancel') verificationModalcancel!: ElementRef;
    @ViewChild('changePasswordModalOpen') changePasswordModalOpen!: ElementRef;
    @ViewChild('changePasswordCancel') changePasswordCancel!: ElementRef;

    adminDetail!: FormGroup;
    adminname: string = '';
    password: string = '';
    errorMsg: string = '';
    forgotPassword = '';
    newPassword: string = '';
    conformPassword: string = '';
    updatedAdminSlno: number = -1;


    constructor(private route: Router, private dataService: ServiceService, private authService: AuthService, private fb: FormBuilder) { }

    ngOnInit(): void {
        this.authService.logout()
        this.formValidation();
    }

    login() {
        if (this.adminname && this.password) {
            this.dataService.loginConformation(this.adminname, this.password).subscribe((conformation) => {
                if (conformation.message === 'User Found') {
                    this.authService.login();
                    this.route.navigate(['/admin'])
                } else if (conformation.message === 'Incorrect Password') {
                    this.errorMsg = conformation.message;
                } else {
                    this.errorMsg = 'User not found';
                }
            });
        } else {
            this.errorMsg = "please fill both Admin Name & Password"
        }
    }

    formValidation(): void {
        this.adminDetail = this.fb.group({
            name: ['', Validators.required],
            position: ['', Validators.required],
            username: ['', Validators.required],
            password: [''],
            email: ['', Validators.required]
        });
    }

    cancelModal() {
        this.forgotPassword = '';
        this.adminDetail.reset();
    }


    submitDetailCheck() {
        if (this.adminDetail.valid) {
            this.dataService.forgetPassword(this.adminDetail.value).subscribe((data) => {
                if (data) {
                    this.forgotPassword = '';
                    this.updatedAdminSlno = data.slno;
                    (this.verificationModalcancel.nativeElement as HTMLButtonElement).click();
                    (this.changePasswordModalOpen.nativeElement as HTMLButtonElement).click();
                } else {
                    this.forgotPassword = 'You entered data not in Admin Database'
                }
            })
        } else {
            alert('Fill all input fields')
        }
    }

    updatePassword() {
        if (this.newPassword && this.newPassword === this.conformPassword) {
            this.dataService.updatePassword(this.conformPassword, this.updatedAdminSlno).subscribe((data) => {
                alert(data.message);
                this.newPassword = '';
                this.conformPassword = '';
                (this.changePasswordCancel.nativeElement as HTMLButtonElement).click();

            })
        } else {
            alert("password conformation failed.")
        }

    }
}

