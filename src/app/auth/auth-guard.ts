import {CanActivateFn} from '@angular/router';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';
import {from} from 'rxjs';
import {inject} from "@angular/core";

export const canActivate: CanActivateFn =
    () => {
        const authService = inject(AuthService);
        return from(authService.hasValidSession()).pipe(
            map(authenticated => {
                if (authenticated) {
                    return true;
                }

                console.log('No valid session')

                return false;
            })
        );
    }