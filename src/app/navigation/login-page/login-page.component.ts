import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";

// eslint-disable-next-line @angular-eslint/prefer-standalone
@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    standalone: false
})
export class LoginPageComponent implements OnInit {

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        void this.authService.logout();
    }

}
