import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {


  // registrationUrl: string = 'http://localhost:3000/newUser';
  // registrationUrl: string = 'http://ec2-35-180-128-122.eu-west-3.compute.amazonaws.com:3000/newUser';
  registrationUrl: string = 'https://us-central1-users-api-75677.cloudfunctions.net/usersApi/newUser';


  constructor(private http: HttpClient) {
  }

  registerNewUser(name: string, surname: string, phone: string, email: string, password: string): Observable<any> {
    return this.http.post<{response : string}>(this.registrationUrl, {'name' : name, 'surname' : surname, 'phone' : phone, 'email' : email, 'password' : password}, {
      responseType: 'json',
      observe: 'body'
    })
  }

}
