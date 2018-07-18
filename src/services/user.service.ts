import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs/internal/Observable";
import {User} from "../Models/user.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class UserService {


  // usersUrl: string = 'http://localhost:3000/users';
  usersUrl: string = 'http://ec2-35-180-128-122.eu-west-3.compute.amazonaws.com:3000/users';


  constructor(private http: HttpClient) {
  }


  getListOfUsers(): Observable<User[]> {


    return this.http.get<User[]>(this.usersUrl);

  }


  updateListOfUsers(users: User[]) : Observable<{response : string}> {
    return this.http.post<{response : string}>(this.usersUrl, users, {
      responseType: 'json',
      observe: 'body'
    })
  }


}