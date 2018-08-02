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

  /**
   * @var {string} The email typed.
   */
  email: string = '';

  /**
   * @var {string} The password typed.
   */
  password: string = '';

  /**
   * @var {string} The response from the API: if some error occours it remains ''.
   */
  responseOfServer: string = '';

  /**
   * @var {string} The pattern used to verify the password typed.
   */
  passwordPattern = '([0-9]+[a-zA-z]+|[a-zA-z]+[0-9]+)+([0-9]+[a-zA-z]*|[a-zA-z]+[0-9]*)*';

  /**
   * @var {boolean} True if eye icon is clicked to show password in clear.
   */
  isPasswordShownLikePlanText: boolean = true;

  /**
   * @var {NgForm} A Reference to the Login Form
   */
  @ViewChild('loginForm') loginForm: NgForm;

  /**
   * @var {NgForm} A Reference to the checkbox
   */
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
