import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {DataStorageService} from '../../services/data-storage.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
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

  email: string = '';
  password: string = '';
  responseOfServer: string = '';

  passwordPattern = '([0-9]+[a-zA-z]+|[a-zA-z]+[0-9]+)+([0-9]+[a-zA-z]*|[a-zA-z]+[0-9]*)*';

  isPasswordShownLikePlanText: boolean = true;

  @ViewChild('loginForm') loginForm: NgForm;
  @ViewChild('checkbox') checkbox: ElementRef;

  constructor(private loginService: LoginService,
              private dataStorageService: DataStorageService,
              private router: Router,
              public loadingService: LoadingService) {
  }

  ngOnInit() {
    this.email = this.dataStorageService.getEmail();
  }

  userHasClickedButtonOfLogin() {

    if (this.loginForm.valid) {

      this.loadingService.setLoading();

      this.loginService.doPostForLogin(this.email, this.password).subscribe(
        (res: User) => {
          this.loadingService.unsetLoading();
          this.responseOfServer = 'Welcome ' + res.name + ' ' + res.surname;
          this.controlIfrememberMailAddressIsChecked();
          this.dataStorageService.setUserAsAutenticated();
          this.router.navigate(['home']);
        },

        (err: HttpErrorResponse) => {
          this.loadingService.unsetLoading();
          if (err.status === 401) {
            this.loginForm.form.setErrors({error401: err.error.error});
          } else {
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
