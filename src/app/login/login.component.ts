import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    username: string = ''
    password: string = ''
    errorMsg: string = ''

    constructor(private route: Router) { }

    login() {
        if (this.username === 'solih') {
            if (this.password === '1234') {
                this.route.navigate(['/admin'])
            } else {
                this.errorMsg = 'Password Incorrect'
            }
        } else {
            this.errorMsg = 'User not found'
        }
    }
}
