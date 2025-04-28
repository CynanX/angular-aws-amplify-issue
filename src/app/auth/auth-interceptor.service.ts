import {Injectable} from "@angular/core";
import {HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {from, Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import {AuthService} from "./auth.service";

export const SKIP_AUTH = new HttpContextToken(() => false)

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.context.get(SKIP_AUTH)) {
            return next.handle(request)
        }
        return from(this.authService.getAuthToken()).pipe(
            switchMap(authToken => {
                if (authToken) {
                    request = request.clone({
                        setHeaders: {
                            Authorization: authToken
                        }
                    })
                }

                return next.handle(request)
            })
        )
    }

}