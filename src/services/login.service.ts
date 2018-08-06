import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  /**
   * @var {string} the url of the remote API.
   */
  loginsUrl: string = 'https://www.usersapi.tk/login';


  constructor(private http: HttpClient) {
  }

  doPostForLogin(email: string, password: string): Observable<any> {

    return this.http.post<{ name: string, surname: string, phone: string, email: string }>(this.loginsUrl, {
      'email': email,
      'password': password
    });
  }
}
