import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

import {AuthInterceptorService} from './auth/auth-interceptor.service'

import {HomePageComponent} from './navigation/home-page/home-page.component';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {AuthService} from "./auth/auth.service";

import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AuthConfigurationService} from "./auth/auth.configuration.service";
import {AmplifyAuthenticatorModule} from "@aws-amplify/ui-angular";
import {LoginPageComponent} from "./navigation/login-page/login-page.component";

const authInitializerFn = (authConfigurationService: AuthConfigurationService) => {
    return async () => {
        return authConfigurationService.configure()
    }
}

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        LoginPageComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        AmplifyAuthenticatorModule,
        BrowserModule,
        NgbModule,
        AppRoutingModule
    ],
    providers: [
        AuthConfigurationService,
        AuthService,
        {
            provide: APP_INITIALIZER,
            useFactory: authInitializerFn,
            multi: true,
            deps: [AuthConfigurationService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        },
        provideHttpClient(withInterceptorsFromDi()),
    ]
})

export class AppModule {
}