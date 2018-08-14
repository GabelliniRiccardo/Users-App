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
import {AuthenticationGuardBeforeLogin} from '../services/authentication-guard-before-login';
import {AuthenticationGuardAfterLogin} from '../services/authentication-guard-after-login';
import {AddUserFormComponent} from '../components/add-user-form/add-user-form.component';
import {DeleteModalComponent} from '../components/modals/delete-modal/delete-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DropdownMenuComponent} from '../components/dropdown-menu/dropdown-menu.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {ShadowOnScrollDirective} from '../directives/shadow-on-scroll/shadow-on-scroll.directive';
import {HeaderComponent} from '../components/header/header.component';
import {RegistrationFormComponent} from '../components/registration-form/registration-form.component';
import {RegistrationService} from '../services/registration.service';
import {LoadingModule} from 'ngx-loading';
import {LoadingService} from '../services/loading.service';
import { ConfirmationModalComponent } from '../components/modals/confirmation-modal/confirmation-modal.component';
import {DynamicHeightDirective} from '../directives/dynamic-height.directive/dynamic-height.directive';
import {FilterUserListPipe} from '../pipes/filter-user-list.pipe';
import {SelectModalComponent} from '../components/modals/select-modal/select-modal.component';
import {EditUserComponent} from '../components/edit-user/edit-user.component';
import {DeviceDetectorDirective} from '../directives/device-detector/device-detector.directive';
import {DeviceService} from '../services/device.service';
import {AuthenticationGuardOnEditPage} from '../services/authentication-guard-on-edit-page';

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
    DeleteModalComponent,
    DropdownMenuComponent,
    ShadowOnScrollDirective,
    DynamicHeightDirective,
    DeviceDetectorDirective,
    HeaderComponent,
    RegistrationFormComponent,
    ConfirmationModalComponent,
    SelectModalComponent,
    FilterUserListPipe,
    EditUserComponent
  ],

  providers: [
    HttpClient,
    LoginService,
    DataStorageService,
    AuthenticationGuardBeforeLogin,
    AuthenticationGuardAfterLogin,
    AuthenticationGuardOnEditPage,
    NgbModal,
    RegistrationService,
    LoadingService,
    DeviceService
  ],

  bootstrap: [AppComponent]

})

export class AppModule {
}
