import {Component, OnInit, ViewChild} from '@angular/core';
import {RegistrationService} from '../../services/registration.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {LoadingService} from '../../services/loading.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {

  name: string = '';
  surname: string = '';
  phone: string = '';
  email: string = '';
  password: string = '';
  confirmMessageFromServer: string;
  isPasswordShownLikePlanText: boolean = false;

  passwordPattern = '([0-9]+[a-zA-z]+|[a-zA-z]+[0-9]+)+([0-9]+[a-zA-z]*|[a-zA-z]+[0-9]*)*';
  phonePattern = '[0-9]*';

  @ViewChild('registrationForm') registrationForm: NgForm;

  constructor(private registrationService: RegistrationService,
              public loadingService: LoadingService) {
  }

  resetConfirmMessageFromServer() {
    this.confirmMessageFromServer = '';
  }

  onRegister() {

    if (this.registrationForm.valid) {

      this.loadingService.setLoading();

      this.registrationService.registerNewUser(this.name, this.surname, this.phone, this.email, this.password)
        .subscribe(
          (response: string) => {
            this.loadingService.unsetLoading();
            this.confirmMessageFromServer = response;
          },
          (err: HttpErrorResponse) => {
            this.loadingService.unsetLoading();
            if (err.status === 401) {
              this.registrationForm.form.setErrors({error401: err.error.error});
            } else {
              this.registrationForm.form.setErrors({genericError: 'Ops, Server is unreachable :( Please try later'});
            }
          }
        );
    }
  }
}
