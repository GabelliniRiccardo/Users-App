import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {

  /**
   * @var {string} the url of the remote API.
   */
  registrationUrl: string = 'https://www.usersapi.tk/newUser';

  constructor(private http: HttpClient) {
  }

  registerNewUser(name: string, surname: string, phone: string, email: string, password: string): Observable<any> {

    return this.http.post<{ response: string }>(this.registrationUrl, {
      'name': name,
      'surname': surname,
      'phone': phone,
      'email': email,
      'password': password
    }, {
      responseType: 'json',
      observe: 'body'
    });
  }
}
