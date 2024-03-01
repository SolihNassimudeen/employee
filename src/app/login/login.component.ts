import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service/employeeData.service';
import { AuthService } from '../Guard/AuthService';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    adminname: string = '';
    password: string = '';
    errorMsg: string = '';

    constructor(private route: Router, private dataService: ServiceService, private authService: AuthService) { }

    ngOnInit(): void {
        this.authService.logout()
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
}

