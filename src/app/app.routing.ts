import {Routes} from '@angular/router';
import {HomePageComponent} from '../components/home-page/home-page.component';
import {LoginFormComponent} from '../components/login-form/login-form.component';
import {AuthenticationGuardBeforeLogin} from '../services/authentication-guard-before-login';
import {AuthenticationGuardAfterLogin} from '../services/authentication-guard-after-login';
import {RegistrationFormComponent} from '../components/registration-form/registration-form.component';
import {EditUserComponent} from '../components/edit-user/edit-user.component';

export const ROUTING: Routes = [

  {path: 'login', component: LoginFormComponent, canActivate: [AuthenticationGuardBeforeLogin]},
  {path: 'registration', component: RegistrationFormComponent},
  {path: 'home', component: HomePageComponent, canActivate: [AuthenticationGuardAfterLogin]},
  {path: 'edit/:id', component: EditUserComponent,  canActivate: [AuthenticationGuardAfterLogin]},
  {path: '**', redirectTo: '/login'},

];
