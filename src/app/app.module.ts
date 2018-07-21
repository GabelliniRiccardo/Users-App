import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {LoginFormComponent} from "../components/login-form/login-form.component";
import {FormsModule} from "@angular/forms";
import {LoginService} from "../services/login.service";
import {ROUTING} from './app.routing';

import {AppComponent} from './app.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {DataStorageService} from "../services/data-storage.service";
import {HomePageComponent} from "../components/home-page/home-page.component";
import {AuthenticationServiceOnLogin} from "../services/authentication-service-on-login.service";
import {AuthenticationServiceOnHomePage} from "../services/authentication-service-on-home-page.service";
import {AddUserForm} from "../components/add-user-form/add-user-form";
import {ModalComponent} from "../components/modal/modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DropdownMenuComponent} from "../components/dropdown-menu/dropdown-menu.component";
import {AngularSvgIconModule} from 'angular-svg-icon';
// import {DropdownDirective} from "../components/dropdown-menu/dropdown.directive";


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularSvgIconModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTING),
    FormsModule,
    NgbModule.forRoot()
  ],

  declarations: [
    AppComponent,
    LoginFormComponent,
    HomePageComponent,
    AddUserForm,
    ModalComponent,
    DropdownMenuComponent,

  ],

  providers: [
    HttpClient,
    LoginService,
    DataStorageService,
    AuthenticationServiceOnLogin,
    AuthenticationServiceOnHomePage,
    NgbModal],

  bootstrap: [AppComponent]

})

export class AppModule {
}

