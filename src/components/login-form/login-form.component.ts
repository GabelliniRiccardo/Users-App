import {Component, Injectable, OnInit, Input, ViewChild, ElementRef} from "@angular/core";
import {LoginService} from "../../services/login.service";
import {DataStorageService} from "../../services/data-storage.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {LoadingService} from '../../services/loading.service';

export interface User {
  name: string,
  surname: string,
  phone: string,
  email: string
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})


export class LoginFormComponent implements OnInit {

  email:                string = '';
  password:             string = '';
  responseOfServer:     string = '';

  emailPattern       = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passwordPattern    = "([0-9]+[a-zA-z]+|[a-zA-z]+[0-9]+)+([0-9]+[a-zA-z]*|[a-zA-z]+[0-9]*)*";

  isPasswordShownLikePlanText: boolean = true;


  @ViewChild('loginForm') loginForm : NgForm;
  @ViewChild('checkbox') checkbox : ElementRef;


  constructor(private loginService: LoginService,
              private dataStorageService: DataStorageService,
              private router : Router,
              public loadingService : LoadingService) {
  }



  ngOnInit() { // OnInit the email is loaded from interval data storage service
    this.email = this.dataStorageService.getEmail();
  }


  userHasClickedButtonOfLogin() {


    if (this.loginForm.valid) {    // only if the form is valid the app make interval request at the API

      this.loadingService.setLoading();

      this.loginService.doPostForLogin(this.email, this.password).subscribe(

        // case 1: Http responseOfServer code is 200 (OK)

        (res: User) => {
          this.loadingService.unsetLoading();
          this.responseOfServer = 'Welcome ' + res.name + ' ' + res.surname;
          this.controlIfrememberMailAddressIsChecked();    // call this method only if all is OK (responseOfServer code is 200)
          this.dataStorageService.setUserAsAutenticated();
          this.router.navigate(['home'])
        },

        // case 2: Http responseOfServer is bad (error 401 (Unathorized or generic error)

        (err: HttpErrorResponse) => {
          this.loadingService.unsetLoading();
          if (err.status === 401) {            // UNATHORIZED
            this.loginForm.form.setErrors({error401: err.error.error})
          } else {                             // GENERIC ERROR (Server Unreachable)
            this.loginForm.form.setErrors({genericError: 'Ops, Server is unreachable :( Please try later'});
          }
        });

    }
  }

  private controlIfrememberMailAddressIsChecked() {
    if (this.checkbox.nativeElement.checked) {
      this.dataStorageService.setEmail(this.email);
    } else {
      if (this.dataStorageService.getEmail() === this.email) {
        this.dataStorageService.clearMail();
      }
    }
  }


}