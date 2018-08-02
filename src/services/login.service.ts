import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  loginsUrl: string = 'https://us-central1-users-api-75677.cloudfunctions.net/usersApi/login';


  constructor(private http: HttpClient) {
  }

  doPostForLogin(email: string, password: string): Observable<any> {

    return this.http.post<{ name: string, surname: string, phone: string, email: string }>(this.loginsUrl, {
      'email': email,
      'password': password
    });
  }
}
