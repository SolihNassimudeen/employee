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

    username: string = ''
    password: string = ''
    errorMsg: string = ''

    constructor(private route: Router, private dataService: ServiceService, private authService: AuthService) { }

    ngOnInit(): void {
        this.authService.logout()
    }

    login() {
        this.dataService.loginConformation(this.username, this.password).subscribe((conformation) => {
            if (conformation) {
                this.authService.login();
                this.route.navigate(['/admin'])
            } else {
                this.errorMsg = 'Admin not found'
            }
        })
    }

}

