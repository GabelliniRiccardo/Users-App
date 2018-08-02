import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {LoginFormComponent} from '../components/login-form/login-form.component';
import {FormsModule} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {ROUTING} from './app.routing';

import {AppComponent} from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {DataStorageService} from '../services/data-storage.service';
import {HomePageComponent} from '../components/home-page/home-page.component';
import {AuthenticationServiceOnLogin} from '../services/authentication-service-on-login.service';
import {AuthenticationServiceOnHomePage} from '../services/authentication-service-on-home-page.service';
import {AddUserFormComponent} from '../components/add-user-form/add-user-form.component';
import {ModalComponent} from '../components/modal/modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DropdownMenuComponent} from '../components/dropdown-menu/dropdown-menu.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {ShadowOnTableDirective} from '../directives/shadow-on-table/shadow-on-table.directive';
import {ShadowOnScrollDirective} from '../directives/shadow-on-scroll/shadow-on-scroll.directive';
import {HeaderComponent} from '../components/header/header.component';
import {RegistrationFormComponent} from '../components/registration-form/registration-form.component';
import {RegistrationService} from '../services/registration.service';
import {LoadingModule} from 'ngx-loading';
import {LoadingService} from '../services/loading.service';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularSvgIconModule,
    ReactiveFormsModule,
    LoadingModule,
    RouterModule.forRoot(ROUTING),
    FormsModule,
    NgbModule.forRoot()
  ],

  declarations: [
    AppComponent,
    LoginFormComponent,
    HomePageComponent,
    AddUserFormComponent,
    ModalComponent,
    DropdownMenuComponent,
    ShadowOnTableDirective,
    ShadowOnScrollDirective,
    HeaderComponent,
    RegistrationFormComponent,
  ],

  providers: [
    HttpClient,
    LoginService,
    DataStorageService,
    AuthenticationServiceOnLogin,
    AuthenticationServiceOnHomePage,
    NgbModal,
    RegistrationService,
    LoadingService
  ],

  bootstrap: [AppComponent]

})

export class AppModule {
}
