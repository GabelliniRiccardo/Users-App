import {Routes} from '@angular/router';
import {HomePageComponent} from '../components/home-page/home-page.component';
import {LoginFormComponent} from '../components/login-form/login-form.component';
import {AuthenticationServiceOnLogin} from '../services/authentication-service-on-login.service';
import {AuthenticationServiceOnHomePage} from '../services/authentication-service-on-home-page.service';
import {RegistrationFormComponent} from '../components/registration-form/registration-form.component';
import {EditUserComponent} from '../components/edit-user/edit-user.component';

export const ROUTING: Routes = [

  {path: 'login', component: LoginFormComponent, canActivate: [AuthenticationServiceOnLogin]},
  {path: 'registration', component: RegistrationFormComponent},
  {path: 'home', component: HomePageComponent, canActivate: [AuthenticationServiceOnHomePage]},
  {path: 'edit/:id', component: EditUserComponent},
  {path: '**', redirectTo: '/login'},

];
