import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})

export class LoginService {


  // loginsUrl: string = 'http://localhost:3000/login';
  loginsUrl: string = 'http://ec2-35-180-128-122.eu-west-3.compute.amazonaws.com:3000/login';



  constructor(private http: HttpClient) {
  }


  doPostForLogin(email: string, password: string): Observable<any> {



    return this.http.post<{name : string, surname : string, phone : string, email : string}>
        (this.loginsUrl, {'email': email, 'password': password});

  }


}
