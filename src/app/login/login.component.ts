import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service/employeeData.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    username: string = ''
    password: string = ''
    errorMsg: string = ''

    constructor(private route: Router, private dataService: ServiceService) { }

    login() {
        this.dataService.loginConformation(this.username, this.password).subscribe((conformation) => {
            if (conformation) {
                this.route.navigate(['/admin'])
            } else {
                this.errorMsg = 'Admin not found'
            }
        })
    }

}

