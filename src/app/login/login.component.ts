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

    adminDetail!: FormGroup;
    adminname: string = '';
    password: string = '';
    errorMsg: string = '';
    forgotPassword = '';
    ifFogotPasswordDiv = false;

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
            password: ['']
        });
    }

    cancelModal() {
        this.adminDetail.reset();
    }


    submitDetailCheck() {
        if (this.adminDetail.valid) {
            this.dataService.forgetPassword(this.adminDetail.value).subscribe((data) => {
                if (data) {
                    this.forgotPassword = ' Your Password is : ' + data.password;
                    this.ifFogotPasswordDiv = true;
                    setTimeout(() => {
                        this.ifFogotPasswordDiv = false;
                        this.forgotPassword = '';
                    }, 3000);
                    (this.verificationModalcancel.nativeElement as HTMLButtonElement).click();
                } else {
                    this.forgotPassword = 'You entered data not in Admin Database'
                    this.ifFogotPasswordDiv = true;
                    setTimeout(() => {
                        this.ifFogotPasswordDiv = false;
                        this.forgotPassword = '';
                    }, 3000);
                }
            })
        } else {
            alert('Fill all input fields')
        }
    }
}

