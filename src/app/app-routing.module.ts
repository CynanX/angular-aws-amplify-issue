import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {canActivate} from './auth/auth-guard';

import {HomePageComponent} from './navigation/home-page/home-page.component';
import {LoginPageComponent} from "./navigation/login-page/login-page.component";

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},

    // navigation routes

    {path: 'home', component: HomePageComponent, canActivate: [canActivate]},
    {path: 'login', component: LoginPageComponent},

    {path: '**', redirectTo:'/home'},
    // catch all
];


@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}