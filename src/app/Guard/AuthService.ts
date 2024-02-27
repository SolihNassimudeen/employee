export class AuthService {

    isLoggedIn: boolean = false;

    constructor() {
        if (localStorage.getItem('isAuthenticated') === 'true') {
            this.isLoggedIn = true;
        } else {
            this.isLoggedIn = false;
        }
    }

    login() {
        this.isLoggedIn = true;
        localStorage.setItem('isAuthenticated', 'true');
    }

    logout() {
        this.isLoggedIn = false;
        localStorage.setItem('isAuthenticated', 'true');
    }

    isAuthenticated() {
        return this.isLoggedIn;
    }
}