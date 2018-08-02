import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {

  registrationUrl: string = 'https://us-central1-users-api-75677.cloudfunctions.net/usersApi/newUser';

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
