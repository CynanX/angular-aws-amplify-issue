import {Component, OnInit} from '@angular/core';
import {Hub} from "aws-amplify/utils";
import {Router} from "@angular/router";

// eslint-disable-next-line @angular-eslint/prefer-standalone
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: false
})
export class AppComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit(): void {
        Hub.listen('auth', (data) => {
            const {payload} = data;
            if (payload.event === 'signedIn' || payload.event === 'signInWithRedirect') {
                this.router.navigateByUrl('/home')
            }
        })
    }

}
